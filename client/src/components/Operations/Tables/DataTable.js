import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { deleteAd, editAd, getAds } from '../../../models';

const DataTable = () => {
  const ad = {
    no_advertisement: null,
    job_title: null,
    job_desc: null,
    job_type: null,
    job_hour_price: null,
    requirements: null,
    responsability: null,
    id_company: null,
    statut: false,
  };

  const [advertisement, setAdvertisement] = useState(ad);
  const [advertisements, setAdvertisements] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [refreshData, setRefreshData] = useState(false);

  const deleteItem = (no_advertisement) => {
    let confirmDelete = window.confirm('Delete item forever?');
    if (confirmDelete) {
      deleteAd(no_advertisement);
      refresh();
    }
  };

  const addItem = async () => {
    try {
      const {
        no_advertisement,
        job_title,
        job_desc,
        job_type,
        job_hour_price,
        requirements,
        responsability,
        statut,
      } = advertisement;
      await editAd(
        no_advertisement,
        job_title,
        job_desc,
        job_type,
        job_hour_price,
        requirements,
        responsability,
        statut
      );
      refresh();
      toggleModal();
    } catch (error) {
      console.log(error);
    }
  };

  const editItem = (item) => {
    setIsOpen((current) => !current);
    setAdvertisement(item);
  };

  const toggleModal = () => {
    setIsOpen((current) => !current);
  };

  const refresh = () => {
    setRefreshData((current) => !current);
  };

  const closeBtn = (
    <button className="close" onClick={toggleModal}>
      <i className="fa fa-close"></i>
    </button>
  );

  useEffect(() => {
    data();
  }, [refreshData]);

  const data = async () => {
    const advert = await getAds();
    setAdvertisements(advert.data);
  };

  const onInputChange = (e, name) => {
    if (e.target || e.target.value) {
      const val = (e.target && e.target.value) || '';
      let _advertisement = { ...advertisement };
      _advertisement[`${name}`] = val;
      setAdvertisement(_advertisement);
    }
  };

  return (
    <div>
      <div className="text-center bg-light w-100 h-100 rounded m-0 p-0">
        <table className="table rounded bg-white table-hover table-responsive">
          <thead className="text-center">
            <tr>
              <th scope="row">#</th>
              <th>Poste</th>
              <th>Description</th>
              <th>Type d'emploi</th>
              <th>Paie par heure</th>
              <th>Company</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {advertisements.map((advertisement, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{advertisement.job_title}</td>
                  <td>{advertisement.job_desc}</td>
                  <td>{advertisement.job_type}</td>
                  <td>{advertisement.job_hour_price}</td>
                  <td>{advertisement.company}</td>
                  <td>
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-dark"
                        onClick={() => editItem(advertisement)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          deleteItem(advertisement.no_advertisement)
                        }
                      >
                        Del
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader close={closeBtn}>Edit Item</ModalHeader>
        <ModalBody>
          <div className="mb-3">
            <label htmlFor="job_title" className="form-label">
              Intitulé du poste
            </label>
            <input
              type="text"
              value={
                advertisement.job_title === null ? '' : advertisement.job_title
              }
              onChange={(e) => onInputChange(e, 'job_title')}
              className="form-control"
              id="job_title"
              placeholder="Developpeur fullStack"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="job_desc" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              value={
                advertisement.job_desc === null ? '' : advertisement.job_desc
              }
              onChange={(e) => onInputChange(e, 'job_desc')}
              id="job_desc"
              placeholder="Description du poste"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="job_type" className="form-label">
              Type de contract
            </label>
            <input
              type="text"
              className="form-control"
              value={
                advertisement.job_type === null ? '' : advertisement.job_type
              }
              onChange={(e) => onInputChange(e, 'job_type')}
              id="job_type"
              placeholder="CDI, CDD"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="job_hour_price" className="form-label">
              Rémunération à l'heure
            </label>
            <input
              type="number"
              value={
                advertisement.job_hour_price === null
                  ? ''
                  : advertisement.job_hour_price
              }
              onChange={(e) => onInputChange(e, 'job_hour_price')}
              className="form-control"
              id="job_hour_price"
              placeholder="24 si une heure est payé 24 euros"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="requirements" className="form-label">
              Qualifications requises
            </label>
            <textarea
              className="form-control"
              id="requirements"
              rows="3"
              value={
                advertisement.requirements === null
                  ? ''
                  : advertisement.requirements
              }
              onChange={(e) => onInputChange(e, 'requirements')}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="responsability" className="form-label">
              Responsabilités liées au poste
            </label>
            <textarea
              className="form-control"
              id="responsability"
              rows="3"
              value={
                advertisement.responsability === null
                  ? ''
                  : advertisement.responsability
              }
              onChange={(e) => onInputChange(e, 'responsability')}
            ></textarea>
          </div>

          <div>
            {advertisement.statut ? (
              <select
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
                onChange={(e) => onInputChange(e, 'statut')}
              >
                <option defaultValue={advertisement.statut}>Disponible</option>
                <option value={!advertisement.statut}>Non disponible</option>
              </select>
            ) : (
              <select
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
                onChange={(e) => onInputChange(e, 'statut')}
              >
                <option defaultValue={advertisement.statut}>
                  Non disponible
                </option>
                <option value={!advertisement.statut}>Disponible</option>
              </select>
            )}
          </div>
          <button className="mt-3 btn btn-success" onClick={addItem}>
            {ad.no_advertisement ? 'Add' : 'Edit'}
          </button>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default DataTable;
