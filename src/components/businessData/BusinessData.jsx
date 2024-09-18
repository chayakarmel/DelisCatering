import { observer } from 'mobx-react';
import { useEffect } from "react";
import dataStore from '../../data/dataStore';
import { getBusinessData } from '../../data/server';
import './business.css';

const BusinessData = observer(() => {
  useEffect(()=>{
 getBusinessData();
  },[])
  //dataStore.businessDatas 
 
    if (!dataStore.businessDatas || dataStore.businessDatas.length === 0) {
    return <div>Loading...</div>; 
  }

  const { logo, businessName, address, phone,img } = dataStore.businessDatas[0];

  return (
    <header>
      <div className='header'>
        <img id='logo' src={logo} alt="Business Logo" />
        <p>{businessName}</p>
        <p>{address}</p>
        <p>{phone}</p>
        <img id="img-header" src={img} alt="Bussiness img"/>
      </div>
    </header>
  );
});

export default BusinessData;
