import React from 'react';

function BillingDetailsForm({ formData, handleChange, handleSubmit, isSubmitting }) {
    return (
        <div className="p-3 p-lg-5 border">
            <form onSubmit={handleSubmit}>
                <div className="form-group row">
                    <div className="col-md-6">
                        <label htmlFor="c_fname" className="text-black">First Name <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="c_fname" name="firstName" value={formData.firstName} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="c_lname" className="text-black">Last Name <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="c_lname" name="lastName" value={formData.lastName} onChange={handleChange} />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-md-12">
                        <label htmlFor="c_companyname" className="text-black">Company Name </label>
                        <input type="text" className="form-control" id="c_companyname" name="companyName" value={formData.companyName} onChange={handleChange} />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-md-12">
                        <label htmlFor="c_address" className="text-black">Address <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="c_address" name="address" placeholder="Street address" value={formData.address} onChange={handleChange} />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-md-6">
                        <label htmlFor="c_state" className="text-black">State / Country <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="c_state" name="state" value={formData.state} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="c_postalzip" className="text-black">Postal / Zip Code <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="c_postalzip" name="postalZip" value={formData.postalZip} onChange={handleChange} />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-md-6">
                        <label htmlFor="c_email" className="text-black">Email Address <span className="text-danger">*</span></label>
                        <input type="email" className="form-control" id="c_email" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="c_phone" className="text-black">Phone Number <span className="text-danger">*</span></label>
                        <input type="tel" className="form-control" id="c_phone" name="phone" value={formData.phone} onChange={handleChange} />
                    </div>
                </div>

                {/* Remove the Place Order button from here */}
            </form>
        </div>
    );
}

export default BillingDetailsForm;
