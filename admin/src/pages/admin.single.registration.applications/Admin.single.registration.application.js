import "./Admin.single.registration.application.css";

function SingleLoanApplications() {
  const result = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 1234567890",
    amount: "₦250,000",
    status: "pending",
    role: "End User",
    date: "12th July, 2024",
  };

  const submit = (param) => {};

  return (
    <>
      <div className="si__st__app">
        <section className="admin__single__notice__section__one">
          <article className="admin__single__notice__section__one__article1">
            <h1>{`Registration application from ${result.name}`}</h1>
          </article>
          <article className="admin__single__notice__section__one__article2">
            <span>
              <h1>Application Date</h1>
              <h3>{result.date}</h3>
            </span>
            <span>
              <h1>User Name</h1>
              <h3>{result.name}</h3>
            </span>
            <span>
              <h1>Application Number</h1>
              <h3>{result.id}</h3>
            </span>
            <span>
              <h1>Name</h1>
              <h3>{result.name}</h3>
            </span>
            <span>
              <h1>Role</h1>
              <h3>{result.role}</h3>
            </span>
            <span>
              <h1>Status</h1>
              <h3>{result.status}</h3>
            </span>
          </article>
          <span className="si__st__app__cta">
            <button
              onClick={() => {
                submit("accept");
              }}
            >
              Accept
            </button>
            <button
              onClick={() => {
                submit("reject");
              }}
            >
              Reject
            </button>
          </span>
        </section>
      </div>
    </>
  );
}

export default SingleLoanApplications;
