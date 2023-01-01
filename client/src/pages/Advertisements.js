import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { addAad, getCompanies } from '../models';
import DataTable from '../components/Operations/Tables/DataTable';

const Advertisements = () => {
  const [job_title, setJob_title] = useState(null);
  const [job_desc, setJob_desc] = useState(null);
  const [job_type, setJob_type] = useState(null);
  const [job_hour_price, setJob_hour_price] = useState(null);
  const [requirements, setRequirements] = useState(null);
  const [responsability, setResponsability] = useState(null);
  const [id_company, setId_company] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    companiesFetch();
  }, [isOpen]);

  const toggleModal = () => {
    setIsOpen((current) => !current);
  };

  const closeBtn = (
    <button className="close" onClick={toggleModal}>
      <i className="fa fa-close"></i>
    </button>
  );

  const companiesFetch = async () => {
    const company = await getCompanies();
    setCompanies(company.data);
  };

  const addItem = async () => {
    if (job_title !== null && job_type !== null) {
      try {
        await addAad(
          job_title,
          job_desc,
          job_type,
          job_hour_price,
          requirements,
          responsability,
          id_company
        );
        toggleModal();
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="read-more-read-less">
      <div className="d-flex flex-wrap justify-content-between text-center m-2 mb-5">
        <p className="fs-1 btn-light">CRUD Advertisements</p>
        <button className="btn pt-0 pb-0" onClick={toggleModal}>
          ADD ADVERTISEMENT
        </button>
      </div>
      <DataTable />
      <Modal isOpen={isOpen} toggle={toggleModal} className="container-fluid">
        <ModalHeader close={closeBtn}>Add Item</ModalHeader>
        <ModalBody>
          <div className="mb-3">
            <label htmlFor="job_title" className="form-label">
              Intitulé du poste
            </label>
            <input
              type="text"
              value={job_title === null ? '' : job_title}
              onChange={(e) => setJob_title(e.target.value)}
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
              value={job_desc === null ? '' : job_desc}
              onChange={(e) => setJob_desc(e.target.value)}
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
              value={job_type === null ? '' : job_type}
              onChange={(e) => setJob_type(e.target.value)}
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
              value={job_hour_price === null ? '' : job_hour_price}
              onChange={(e) => setJob_hour_price(e.target.value)}
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
              value={requirements === null ? '' : requirements}
              onChange={(e) => setRequirements(e.target.value)}
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
              value={responsability === null ? '' : responsability}
              onChange={(e) => setResponsability(e.target.value)}
            ></textarea>
          </div>
          <div>
            <select
              className="form-select form-select-sm mb-2"
              aria-label=".form-select-sm example"
              value={id_company}
              onChange={(e) => setId_company(e.target.value)}
            >
              <option defaultValue=""> </option>
              {companies.map((company, index) => {
                return (
                  <option key={index} value={company.no_company}>
                    {company.company}
                  </option>
                );
              })}
            </select>
          </div>
          <button className="mt-3 btn btn-success" onClick={addItem}>
            Add
          </button>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Advertisements;
