import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import User from './components/User';
import { Dispatch } from 'redux';
import * as userActionList from "./redux/users/action"
import { connect } from 'react-redux';
import { RootState } from './redux/reducer';
import { countries } from './components/data';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody } from 'react-bootstrap';
import UserDetailForm from './components/UserDetailForm';

interface Props {
  addUserToRedux: any
  userListFromRedux: {
    id: number
    mobile: string
    primary: string
    shortName: string
  }[]
}

const App: React.FC<Props> = ({ addUserToRedux, userListFromRedux }) => {

  const [mobileNo, setMobileNo] = useState("");


  const [selectedCountryId, setSelectedCountryId] = useState<number>(countries[0].id);


  const addCountryAndMobile = () => {
    const filteredData = countries.find(
      (item) => item.id == selectedCountryId
    );

    let phone_length = 10;
    if (filteredData && filteredData.phone_length > 0) {
      phone_length = filteredData.phone_length;
    }

    if (!filteredData?.hasOwnProperty("primary")) {
      alert("Please select country")
    } else if (mobileNo.replace(/\D/g, "").length < phone_length) {
      alert("Please enter correct mobile number")
    } else {
      addUserToRedux([...userListFromRedux, { ...filteredData, mobile: mobileNo }]);
      setMobileNo("")
    }
  };


  return (
    <>
      <div className="App d-flex justify-content-center mt-5">
        <Card style={{ width: "50rem" }}>
          <CardBody>
            <User
              setMobileNo={setMobileNo}
              addCountryAndMobile={addCountryAndMobile}
              setSelectedCountryId={setSelectedCountryId}
              selectedCountryId={selectedCountryId}
              mobileNo={mobileNo}
            />
          </CardBody>
        </Card>

      </div>
      <UserDetailForm userListFromRedux={userListFromRedux} />
    </>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addUserToRedux: (data: any) => dispatch(userActionList.userAction(data)),
  };
};

const mapStateToProps = (state: RootState) => {
  return {
    userListFromRedux: state?.countriesData?.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
