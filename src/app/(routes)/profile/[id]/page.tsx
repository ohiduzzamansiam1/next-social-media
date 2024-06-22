import React from "react";

function ProfileRoute({ params }: { params: { id: string } }) {
  return <div>{params.id}</div>;
}
export default ProfileRoute;
