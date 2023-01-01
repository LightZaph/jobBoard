import React, { useEffect, useState } from 'react';
import { addAad, getCompanies } from '../../../models';

const AddEditForm = () => {
  const [companies, setCompanies] = useState([]);
  const [company_id, setCompany_id] = useState(null);
  const [job_title, setJob_title] = useState(null);
  const [job_desc, setJob_desc] = useState(null);
  const [job_type, setJob_type] = useState(null);
  const [job_hour_price, setJob_hour_price] = useState(null);
  const [requirements, setRequirements] = useState(null);
  const [responsability, setResponsability] = useState(null);

  useEffect(() => {
    companiesFetch();
  }, []);

  const companiesFetch = async () => {
    const company = await getCompanies();
    setCompanies(company.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      job_title !== null &&
      job_desc !== null &&
      job_type !== null &&
      company_id !== null
    ) {
      try {
        await addAad(
          job_title,
          job_desc,
          job_type,
          job_hour_price,
          requirements,
          responsability,
          company_id
        );
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    } else {
      alert('Aérifez les champs et soumettez à nouveau.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="mb-3">
        <label htmlFor="job_title" class="form-label">
          Intitulé du poste
        </label>
        <input
          type="text"
          value={job_title === null ? '' : job_title}
          onChange={(e) => setJob_title(e.target.value)}
          class="form-control"
          id="job_title"
          placeholder="Developpeur fullStack"
        />
      </div>
      <div class="mb-3">
        <label htmlFor="job_desc" class="form-label">
          Description
        </label>
        <input
          type="text"
          class="form-control"
          value={job_desc === null ? '' : job_desc}
          onChange={(e) => setJob_desc(e.target.value)}
          id="job_desc"
          placeholder="Description du poste"
        />
      </div>
      <div class="mb-3">
        <label htmlFor="job_type" class="form-label">
          Type de contract
        </label>
        <input
          type="text"
          class="form-control"
          value={job_type === null ? '' : job_type}
          onChange={(e) => setJob_type(e.target.value)}
          id="job_type"
          placeholder="CDI, CDD"
        />
      </div>
      <div class="mb-3">
        <label htmlFor="job_hour_price" class="form-label">
          Rémunération à l'heure
        </label>
        <input
          type="number"
          value={job_hour_price === null ? '' : job_hour_price}
          onChange={(e) => setJob_hour_price(e.target.value)}
          class="form-control"
          id="job_hour_price"
          placeholder="24 si une heure est payé 24 euros"
        />
      </div>
      <div class="mb-3">
        <label htmlFor="requirements" class="form-label">
          Qualifications requises
        </label>
        <textarea
          class="form-control"
          id="requirements"
          rows="3"
          value={requirements === null ? '' : requirements}
          onChange={(e) => setRequirements(e.target.value)}
        ></textarea>
      </div>
      <div class="mb-3">
        <label htmlFor="responsability" class="form-label">
          Responsabilités liées au poste
        </label>
        <textarea
          class="form-control"
          id="responsability"
          rows="3"
          value={responsability === null ? '' : responsability}
          onChange={(e) => setResponsability(e.target.value)}
        ></textarea>
      </div>
      <div>
        <select
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
          value={company_id}
          onChange={(e) => setCompany_id(e.target.value)}
        >
          <option selected> </option>
          {companies.map((company, index) => {
            return (
              <option key={index} value={company.no_company}>
                {company.company}
              </option>
            );
          })}
        </select>
      </div>
      <button className="mt-3 btn btn-success">Add</button>
    </form>
  );
};

export default AddEditForm;
/**
<Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
      <FormGroup>
        <Label for="job_title">Intitulé du poste</Label>
        <Input
          type="text"
          name="job_title"
          id="job_title"
          onChange={this.onChange}
          value={this.state.job_title === null ? '' : this.state.job_title}
        />
      </FormGroup>
      <FormGroup>
        <Label for="job_desc">Description</Label>
        <Input
          type="text"
          name="job_desc"
          id="job_desc"
          onChange={this.onChange}
          value={this.state.job_desc === null ? '' : this.state.job_desc}
        />
      </FormGroup>
      <FormGroup>
        <Label for="job_type">Type de contract</Label>
        <Input
          type="job_type"
          name="job_type"
          id="job_type"
          onChange={this.onChange}
          value={this.state.job_type === null ? '' : this.state.job_type}
        />
      </FormGroup>
      <FormGroup>
        <Label for="job_hour_price">Rémunération à l'heure</Label>
        <Input
          type="text"
          name="job_hour_price"
          id="job_hour_price"
          onChange={this.onChange}
          value={
            this.state.job_hour_price === null ? '' : this.state.job_hour_price
          }
          placeholder="24 si une heure est payé 24 euros"
        />
      </FormGroup>
      <FormGroup>
        <Label for="requirements">Qualifications requises</Label>
        <Input
          type="text"
          name="requirements"
          id="requirements"
          onChange={this.onChange}
          value={
            this.state.requirements === null ? '' : this.state.requirements
          }
          placeholder="Ex: Dynamique. Travailleur. etc."
        />
      </FormGroup>
      <FormGroup>
        <Label for="responsability">Responsabilités liées au postes</Label>
        <Input
          type="text"
          name="responsability"
          id="responsability"
          onChange={this.onChange}
          value={
            this.state.responsability === null ? '' : this.state.responsability
          }
          placeholder="Ex: Augmenter les ventes. Optimiser le service. etc."
        />
      </FormGroup>
      <FormGroup>
        <Label for="id_company">Entreprise</Label>
        <Input
          type="select"
          name="id_company"
          id="id_company"
          size={1}
          onChange={this.onChange}
          value={this.state.id_company}
        >
          {companies}
          <option value=""></option>
        </Input>
      </FormGroup>
      <Button>Submit</Button>
    </Form>
 */
