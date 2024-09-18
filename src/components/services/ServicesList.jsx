
import { observer } from 'mobx-react';
import { getServices } from '../../data/server';
import Service from './Service';
import { useEffect } from 'react';
import dataStore from '../../data/dataStore';
import './service.css'

const ServicesList = (observer(() => {
    useEffect(() => {
        if (!dataStore.services.length) {
            getServices()
        }
    }, [])

    return (
        <>

            <div >
                <div className='service'>{dataStore.services.map((service, indexs) => {
                    return <Service key={indexs} service={service}>{service.name}</Service>
                })}
                </div>
            </div>
        </>
    )
}))

export default ServicesList