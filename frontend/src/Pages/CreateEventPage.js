import React, { useState } from "react";
import CreateEventForm from "../Components/CreateEventForm";

function CreateEventPage() {
  const [createdEvent, setCreatedEvent] = useState(null);

  const handleCreate = (event) => {
    setCreatedEvent(event);
    console.log("Created Event:", event);
  };

  return (
    <div>
      {createdEvent ? (
        <div>
          <h3>Event Created Successfully!</h3>
          <pre>{JSON.stringify(createdEvent, null, 2)}</pre>
        </div>
      ) : (
        <CreateEventForm onCreate={handleCreate} />
      )}
    </div>
  );
}

export default CreateEventPage;
