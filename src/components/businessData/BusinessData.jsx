
import { observer } from 'mobx-react';
import { useEffect } from "react";
import dataStore from '../../data/dataStore';
import { getBusinessData } from '../../data/server';
import './business.css';


const BusinessData = (observer(() => {

  useEffect(() => {
    console.log('useEffect')
    if (!Object.entries(dataStore.businessDatas).keys.length) {
      getBusinessData();
      console.log('getBusinessData')

    }

  }, [])




  return (
    <>

      <header >

        <div className='header'>


          <img id='logo' src={dataStore.businessDatas.logo} alt="Business Logo" />

          <p>{dataStore.businessDatas.businessName}</p>
          <p> {dataStore.businessDatas.address}</p>
          <p>{dataStore.businessDatas.phone}</p>

        </div>


      </header >
      <div>

        {/* 'שיניתי לקישור קיים לתמונה כדי שהתצוגה הראשונית תראה טוב, עובד גם באופציה ב */}

        {/* אופציה א' */}
        
        <img id="img-header" src="https://www.delis.co.il/contentManagment/uploadedFiles/new/drushim_top_img.jpg" alt="Business image" />
        {/* אופציה ב' */}
        {/* <img id="img-header" src={dataStore.businessDatas.img} alt="Business image" /> <img id="img-header" src={dataStore.businessDatas.img} alt="Business image" /> */}
      </div>
    </>
  );
}));

export default BusinessData;





