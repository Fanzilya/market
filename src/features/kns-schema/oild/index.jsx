import styles from '../scheme-form/scheme-form.module.css'
import { SchemaCore, SchemaDimensions, SchemaLegend } from './elements'

export const KNSSchema = ({ data, extras }) => {
    const {
        // Основные параметры
        workingPumps = '2',
        reservePumps = '1',

        // Параметры трубопроводов
        inletDiameter = '250',
        inletDirection = '12',
        outletDiameter = '200',
        outletDirection = '3',
        outletCount = '1',

        // Параметры станции
        stationDiameter = '3',
        stationHeight = '5',
        insulation = '1.5'
    } = data

    const totalPumps = (parseInt(workingPumps) || 2) + (parseInt(reservePumps) || 1)

    return (
        <div className={styles.schemaContainer}>
            <svg width="100%" height="600" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
                <SchemaCore
                    workingPumps={workingPumps}
                    reservePumps={reservePumps}
                    inletDiameter={inletDiameter}
                    outletDiameter={outletDiameter}
                    insulation={insulation}
                    totalPumps={totalPumps}
                    extras={extras}
                />

                <SchemaLegend extras={extras} />

                <SchemaDimensions
                    inletDiameter={inletDiameter}
                    outletDiameter={outletDiameter}
                    stationDiameter={stationDiameter}
                    stationHeight={stationHeight}
                />
            </svg>
        </div>
    )
}