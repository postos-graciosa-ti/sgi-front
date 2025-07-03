import dayjs from 'dayjs';
import { Trash } from 'react-bootstrap-icons';
import ReactSelect from 'react-select';

const ApplicantCardList = ({
  applicantsList,
  userSession,
  yesNoOptions,
  setSelectedApplicant,
  setProcessChecklistModalOpen,
  handleOpenSelectiveProcessModal,
  onChangeRhOpinion,
  onChangeCoordinatorOpinion,
  handleSendEmailFeedback,
  handleWhatsappFeedback,
  handleInactivateApplicant,
  handleOpenHireApplicantModal,
  handleOpenSpecialNotationMoal
}) => {
  return (
    <div className="mt-3">
      {applicantsList && applicantsList.map(applicant => (
        <ApplicantCard
          key={applicant.id}
          applicant={applicant}
          userSession={userSession}
          yesNoOptions={yesNoOptions}
          setSelectedApplicant={setSelectedApplicant}
          setProcessChecklistModalOpen={setProcessChecklistModalOpen}
          handleOpenSelectiveProcessModal={handleOpenSelectiveProcessModal}
          onChangeRhOpinion={onChangeRhOpinion}
          onChangeCoordinatorOpinion={onChangeCoordinatorOpinion}
          handleSendEmailFeedback={handleSendEmailFeedback}
          handleWhatsappFeedback={handleWhatsappFeedback}
          handleInactivateApplicant={handleInactivateApplicant}
          handleOpenHireApplicantModal={handleOpenHireApplicantModal}
          handleOpenSpecialNotationMoal={handleOpenSpecialNotationMoal}
        />
      ))}
    </div>
  );
};

const ApplicantCard = ({
  applicant,
  userSession,
  yesNoOptions,
  setSelectedApplicant,
  setProcessChecklistModalOpen,
  handleOpenSelectiveProcessModal,
  onChangeRhOpinion,
  onChangeCoordinatorOpinion,
  handleSendEmailFeedback,
  handleWhatsappFeedback,
  handleInactivateApplicant,
  handleOpenHireApplicantModal,
  handleOpenSpecialNotationMoal
}) => {
  const canEdit = userSession?.id === applicant.created_by || userSession?.id === applicant.redirect_to;
  const rhOpinionSet = !!applicant?.rh_opinion;
  const coordOpinionSet = !!applicant?.coordinator_opinion;

  const opinionStyle = (value) => ({
    control: (base) => ({
      ...base,
      borderColor: value === 'aprovado' ? 'green' : '#dc3545',
      boxShadow: `0 0 0 0.25rem rgba(${value === 'aprovado' ? '25, 135, 84' : '220, 53, 69'}, 0.25)`,
      '&:hover': { borderColor: value === 'aprovado' ? 'green' : '#dc3545' },
    }),
  });

  return (
    <div className="card mb-3 shadow">
      <div className="card-body">
        <h5 className="card-title">{applicant.name}</h5>

        <div className="text-muted mb-2">
          {applicant.attendance_date ? dayjs(applicant.attendance_date).format("DD/MM/YYYY") : ""}
        </div>

        {applicant.email_feedback === "sim" && (
          <span className="badge text-bg-success p-2 me-2">Retorno E-mail</span>
        )}
        {applicant.whatsapp_feedback === "sim" && (
          <span className="badge text-bg-success p-2 me-2">Retorno WhatsApp</span>
        )}
      </div>

      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <button
            className="btn btn-light w-100"
            onClick={() => {
              setSelectedApplicant(applicant);
              setProcessChecklistModalOpen(true);
            }}
          >
            Andamento do processo
          </button>
        </li>

        <li className="list-group-item">
          <button
            className="btn btn-primary w-100"
            disabled={!canEdit}
            onClick={() => handleOpenSelectiveProcessModal(applicant)}
          >
            Processo seletivo
          </button>
        </li>

        <li className="list-group-item">
          <label className="fw-bold mb-3">Parecer RH</label>
          <ReactSelect
            placeholder=""
            options={yesNoOptions}
            onChange={(opinion) => onChangeRhOpinion(opinion, applicant)}
            defaultValue={yesNoOptions.find((opt) => opt.value === applicant?.rh_opinion)}
            isDisabled={!canEdit || rhOpinionSet}
            className={`react-select ${rhOpinionSet ? (applicant.rh_opinion === "aprovado" ? "is-valid" : "is-invalid") : ""}`}
            classNamePrefix="react-select"
            styles={rhOpinionSet ? opinionStyle(applicant.rh_opinion) : {}}
          />
        </li>

        <li className="list-group-item">
          <label className="fw-bold mb-3">Parecer gestor</label>
          <ReactSelect
            placeholder=""
            options={yesNoOptions}
            onChange={(opinion) => onChangeCoordinatorOpinion(opinion, applicant)}
            defaultValue={yesNoOptions.find((opt) => opt.value === applicant?.coordinator_opinion)}
            isDisabled={!canEdit || coordOpinionSet}
            className={`react-select ${coordOpinionSet ? (applicant.coordinator_opinion === "aprovado" ? "is-valid" : "is-invalid") : ""}`}
            classNamePrefix="react-select"
            styles={coordOpinionSet ? opinionStyle(applicant.coordinator_opinion) : {}}
          />
        </li>

        <li className="list-group-item">
          <div className="text-center mt-3">
            <label className="fw-bold mb-3">Não se esqueça de dar retorno ao candidato =)</label>
          </div>
          <div className="row mt-4 mb-4">
            <div className="col">
              <button className="btn btn-light w-100 shadow fw-bold" onClick={() => handleSendEmailFeedback(applicant)}>
                E-mail
              </button>
            </div>
            <div className="col">
              <button className="btn btn-light w-100 shadow fw-bold" onClick={() => handleWhatsappFeedback(applicant)}>
                WhatsApp
              </button>
            </div>
          </div>
          <div className="mb-4">
            <button className="btn btn-danger w-100" onClick={() => handleInactivateApplicant(applicant)}>
              <Trash />
            </button>
          </div>
        </li>

        <li className="list-group-item">
          {
            applicant?.rh_opinion === "aprovado" && applicant?.coordinator_opinion === "aprovado" ? (
              <div style={{ minWidth: '180px' }}>
                <button
                  className="btn btn-success w-100"
                  onClick={() => handleOpenHireApplicantModal(applicant)}
                  disabled={
                    !canEdit && userSession?.function?.name !== "Analista de RH"
                  }
                >
                  Efetivar
                </button>
              </div>
            ) : (["reprovado"].includes(applicant?.rh_opinion) || ["reprovado"].includes(applicant?.coordinator_opinion)) && (
              <div style={{ minWidth: '180px' }}>
                <button
                  className="btn btn-dark w-100"
                  onClick={() => handleOpenSpecialNotationMoal(applicant)}
                  disabled={userSession?.id !== applicant.created_by}
                >
                  Anotação especial
                </button>
              </div>
            )
          }
        </li>
      </ul>
    </div>
  );
};

export default ApplicantCardList;
