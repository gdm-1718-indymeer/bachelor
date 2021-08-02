import React from 'react'

const Profile = () => {
    return (
        <>
            <div className="container content clear-fix">

                <h2 className="mt-5 mb-5">Profile Settings</h2>

                <div className="row" >

                    <div className="col-md-3">

                        <div href="'" className="d-inline"><img src="https://image.flaticon.com/icons/svg/236/236831.svg" width='130px'  /><br />
                        <p className="pl-2 mt-2"><a href="#" className="btn" >Edit Picture</a></p>
                        </div>

                    </div>

                    <div className="col-md-9">

                        <div className="container">

                            <form>
                                <div className="form-group">
                                    <label htmlFor='fullName'>Full Name</label>
                                    <input type="text" className="form-control" id="fullName" />
                                </div>
                            
                                <div className="form-group">
                                    <label htmlFor='email'>Email</label>
                                    <input type="email" className="form-control" id="email" />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor='pass'>Password</label>
                                    <input type="password" className="form-control" id="pass" />
                                </div>
                                
                                <div className="form-group ">
                                    <label htmlFor='birthday'>Birthday</label>
                                    <input type="date" className="form-control" id="birthday" />
                                </div>

                                <div className="row mt-5">
                                    <div className="col">
                                        <button type="button" className="btn btn-primary btn-block">Save Changes</button>
                                    </div>

                                    <div className="col">
                                        <button type="button" className="btn btn-default btn-block">Cancel</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
