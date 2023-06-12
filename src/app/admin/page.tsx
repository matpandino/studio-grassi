import { currentUser } from "@clerk/nextjs";
import React from "react";

const page = async () => {
    const user = await currentUser();

  return (
    <div>
      <div>page</div>
      {JSON.stringify(user, null, 2)}
    </div>
  );
};

export default page;
