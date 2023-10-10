import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { RootState } from '../redux/reducer';
import { Button, Container, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap';
import { countries } from './data';
import Inputmask from 'inputmask';

interface Props {
  setSelectedCountryId: React.Dispatch<React.SetStateAction<number>>
  userListFromRedux: {
    id: number
    mobile: string
    primary: string
    shortName: string
  }[]
  addCountryAndMobile: () => void
  selectedCountryId: number
  setMobileNo: React.Dispatch<React.SetStateAction<string>>
  mobileNo: string
}

const User: React.FC<Props> = ({ addCountryAndMobile, selectedCountryId, setSelectedCountryId, setMobileNo, mobileNo }) => {


  const [CountryList, setCountryList] = useState(countries);
  const [search, setSearch] = useState("");


  const onFIlterCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLowerCase());
    const filter = countries.filter((country) =>
      country.primary.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setCountryList(filter);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobileNo(e.target.value);
  };

  const [PhonemaskFrmt, setPhonemaskFrmt] = useState<string>('(999) 999-9999');
  const [PhonePlaceHolder, setPhonePlaceHolder] = useState<string>('(000) 000-0000');
  const [DisplayCountry, setDisplayCountry] = useState<string>('');

  useEffect(() => {
    Inputmask({
      mask: PhonemaskFrmt,
      removeMaskOnSubmit: true,
    }).mask('#phoneNumber');
  }, [PhonemaskFrmt])

  useEffect(() => {
    let DisplayName = `${countries[0].primary} (${countries[0].shortName})`;
    if (selectedCountryId > 0) {
      const filteredData = countries.find(
        (item) => item.id == selectedCountryId
      )
      if (filteredData) {
        DisplayName = `${filteredData.primary} (${filteredData.shortName})`;
        let phone_length = 10;
        if (filteredData.phone_length > 0) {
          phone_length = filteredData.phone_length;
        }
        let Format = "";
        let placeHolder = "";
        for (let i = 0; i < phone_length; i++) {
          if (i == 0) {
            Format = Format + '(';
            placeHolder = placeHolder + '(';
          }
          if (i == 3) {
            Format = Format + ') ';
            placeHolder = placeHolder + ') ';
          }
          if (i == 6) {
            Format = Format + '-';
            placeHolder = placeHolder + '-';
          }
          Format = Format + '9';
          placeHolder = placeHolder + '0';
        }
        setPhonePlaceHolder(placeHolder);
        setPhonemaskFrmt(Format);
      }
    }
    setDisplayCountry(DisplayName);

  }, [selectedCountryId])


  return (
    <div style={{ padding: "3rem" }}>
      <Container className="mt-4">
        <div className="d-flex justify-content-start flex-wrap">
          <div className='mb-2'>
            <DropdownButton
              id="dropdown-item-button"
              title={DisplayCountry}
              className="mx-3"
              onSelect={function (evt) {
                setSelectedCountryId(Number(evt));
              }}
              onClick={() => {
                setCountryList(countries);
                setSearch("");
              }}
            >
              <Dropdown.ItemText>
                <input
                  type="text"
                  onChange={(e) => onFIlterCountry(e)}
                  defaultValue={search}
                  placeholder='Search Country'
                  style={{ width: "100%" }}
                />
              </Dropdown.ItemText>

              {CountryList.map((country, index) => (
                <Dropdown.Item
                  as="button"
                  eventKey={country.id}
                  key={index}
                >
                  {country.primary}{" "}({country.shortName}) {"   "}{" "}
                  {/* {country.secondary} */}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </div>

          <div>
            <InputGroup className="mb-3">
              <Form.Control
                id="phoneNumber"
                placeholder={PhonePlaceHolder}
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e) => handleChange(e as any)}
                value={mobileNo}
                defaultValue={mobileNo}
              />
            </InputGroup>
          </div>
        </div>
        <Button variant="primary" onClick={addCountryAndMobile}>
          Submit
        </Button>
      </Container>
    </div>
  )
}


const mapStateToProps = (state: RootState) => {
  return {
    userListFromRedux: state?.countriesData?.user
  };
};

export default connect(mapStateToProps)(User)