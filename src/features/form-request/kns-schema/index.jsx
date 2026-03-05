import { schemeKNS } from '../scheme-form/components/teeska'
import { ZoomableContainer } from './zoomable-container'

export const KNSSchema = ({ data, extras, styles }) => {

    // const [components, setComponents] = useState(checkBox)

    return (
        <div className={styles.schemaContainer}>
            {/* <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 16, height: '100%', position: "relative" }}> */}
            <ZoomableContainer>
                {schemeKNS.map((item, key) => (
                    <img key={extras.lenth + key + 1}
                        src={item.image}
                        style={{
                            position: 'absolute',
                            top: item.innerY,
                            width: item.innerWidth,
                            height: item.innerHeight,
                            objectFit: 'contain',
                            cursor: 'move',
                            left: "50%",
                            transform: "translateX(-50%)"
                        }}
                    />
                ))}

                {extras
                    .filter((component) => component.checked)
                    .map((component) => (
                        <img
                            key={component.id}
                            src={component.image}
                            style={{
                                position: 'absolute',
                                left: component.innerX,
                                top: component.innerY,
                                width: component.innerWidth,
                                height: component.innerHeight,
                                objectFit: 'contain',
                                cursor: 'move',
                            }}
                        />
                    ))}
            </ZoomableContainer>
            {/* </div> */}
        </div>
    )
}


// const handleChangeComponentField = (id, field, value) => {
//     setComponents((prev) =>
//         prev.map((component) =>
//             component.id === id
//                 ? {
//                     ...component,
//                     [field]: Number.isNaN(Number(value)) ? 0 : Number(value),
//                 }
//                 : component,
//         ),
//     )
// }

// const activeExtras = Array.isArray(extras) ? extras : []

// const handleResetLayout = () => {
//     setComponents(
//         dataScheme.map((item) => ({
//             ...item,
//             id: String(item.value),
//         })),
//     )
// }

// const handleSaveLayout = () => {
//     if (typeof window === 'undefined') {
//         return
//     }

//     try {
//         window.localStorage.setItem('knsSchemaLayout', JSON.stringify(components))
//     } catch {
//         // если не удалось сохранить, просто ничего не делаем
//     }
// }

// const getNameByValue = (value) => {
//     const extra = activeExtras.find((item) => item.value === value)
//     return extra?.name ?? `Компонент ${value}`
// }

// const isChecked = (value) => {
//     const extra = activeExtras.find((item) => item.value === value)
//     return Boolean(extra?.checked)
// }