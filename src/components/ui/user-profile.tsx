type UserProfile = {
  username: string;
  email: string;
  img: string;
};

const UserProfile = (Profile: UserProfile) => {
  return (
    <div>
      <img src={Profile.img} />
    </div>
  );
};

export default UserProfile;
