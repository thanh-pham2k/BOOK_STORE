import React ,{useState} from "react";
import { useGlobalState } from "../state/provider";
import { domain,header } from "../env";
import Axios from "axios";

const ProfilePage = () => {
  const [{ profile,pagereload }, {dispatch}] = useGlobalState();
//   console.log(profile, "$$$ from Profile Page");

const [email,setEmail] = useState(profile?.prouser?.email)
const [firstname,setFirstname] = useState(profile?.prouser.first_name)
const [lastname,setLastname] = useState(profile?.prouser.last_name)

const [image,setImage] = useState(null)


const userdataupdate = async()=>{
    await Axios({
        method:"post",
        url:`${domain}/api/userdataupdate/`,
        headers:header,
        data:{
            "first_name":firstname,
            "last_name":lastname,
            "email":email
        }
    }).then(response=>{
        console.log(response.data);
        dispatch({
            type:"PAGE_RELOAD",
            pagereload:response.data
        })
    })
}

const updateprofileimage= async()=>{
    const formdata = new FormData();
    formdata.append("image",image)

    await Axios({
        method: "post",
        url:`${domain}/api/profileimageupdate/`,
        headers: {
            Authorization: `token ${window.localStorage.getItem('token')}`
        },
        data:formdata
    }).then(response=>{
        console.log(response.data);
    })
}

  return (
    <div className="container">
      <div className="row">
        <div className="media">
          <img
            src={`${domain}${profile?.image}`}
            className="rounded-circle account-img"
          />
          <div className="media-body">
            <h2>{profile?.prouser?.username}</h2>
            <h2>{profile?.prouser?.email}</h2>
            <p>{profile?.prouser.first_name}{profile?.prouser.last_name}</p>
          </div>
        </div>
        <div className="">
         
        <div className="form-group">
            <label>Profile Image</label>
            <input  onChange={e=>setImage(e.target.files[0])} type="file" className="form-control" />
          <button  onClick={updateprofileimage} className="btn btn-info my-2">Upload</button>
          </div>
         
          <div className="form-group">
            <label>Email</label>
            <input  onChange={(e)=>setEmail(e.target.value)}  type="text" className="form-control" value={email} />
          </div>
          <div className="form-group">
            <label>First Name</label>
            <input onChange={(e)=>setFirstname(e.target.value)} type="text" className="form-control" value={firstname}/>
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input onChange={(e)=>setLastname(e.target.value)} type="text" className="form-control" value={lastname}/>
          </div>
          <button className="btn btn-success my-2">Update</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
