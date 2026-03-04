import styles from '../scheme-form/scheme-form.module.css'

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

const SchemaCore = ({ workingPumps, reservePumps, inletDiameter, outletDiameter, insulation, totalPumps, extras }) => (
    <g transform="translate(400, 300)">
        <rect
            x="-100"
            y="-150"
            width="200"
            height="300"
            fill="none"
            stroke="#4A85F6"
            strokeWidth="3"
            rx="10"
        />

        {insulation && parseFloat(insulation) > 0 && (
            <>
                <rect
                    x="-105"
                    y="-155"
                    width="210"
                    height={parseFloat(insulation) * 50 + 310}
                    fill="rgba(74, 133, 246, 0.1)"
                    stroke="#4A85F6"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    rx="12"
                />
                <text
                    x="0"
                    y="-180"
                    textAnchor="middle"
                    fontSize="10"
                    fill="#4A85F6"
                >
                    Утепление {insulation}м
                </text>
            </>
        )}

        <Ladder />
        <VentPipes />
        <Pumps workingPumps={workingPumps} reservePumps={reservePumps} totalPumps={totalPumps} />

        <InletPipeline inletDiameter={inletDiameter} extras={extras} />
        <OutletPipeline outletDiameter={outletDiameter} extras={extras} />

        {extras['Колодец с задвижкой перед КНС'] && <PreWell />}
        {extras['Наземный павильон'] && <Pavilion />}
        {extras['Грузоподъемное устройство'] && <Hoist />}
        {extras['Газоанализатор'] && <GasAnalyzer />}
    </g>
)

const Ladder = () => (
    <>
        <line x1="80" y1="-120" x2="80" y2="120" stroke="#94a3b8" strokeWidth="2" />
        {[-100, -50, 0, 50, 100].map((y, i) => (
            <line
                key={i}
                x1="70"
                y1={y}
                x2="90"
                y2={y}
                stroke="#94a3b8"
                strokeWidth="2"
            />
        ))}
        <text x="95" y="-130" fontSize="8" fill="#64748b">Лестница</text>
    </>
)

const VentPipes = () => (
    <>
        <line x1="-80" y1="-160" x2="-80" y2="-140" stroke="#94a3b8" strokeWidth="2" />
        <circle cx="-80" cy="-165" r="5" fill="#94a3b8" />
        <line x1="80" y1="-160" x2="80" y2="-140" stroke="#94a3b8" strokeWidth="2" />
        <circle cx="80" cy="-165" r="5" fill="#94a3b8" />
        <text x="-90" y="-180" fontSize="8" fill="#64748b">Вент. труба 2шт</text>
    </>
)

const Pumps = ({ workingPumps, reservePumps, totalPumps }) => (
    <>
        {[...Array(totalPumps)].map((_, i) => {
            const x = -60 + i * 40
            const y = -30 + (i % 2) * 30
            return (
                <g key={i}>
                    <rect
                        x={x}
                        y={y}
                        width="30"
                        height="50"
                        fill="#10B981"
                        opacity="0.8"
                        rx="5"
                    />
                    <circle cx={x + 15} cy={y - 5} r="5" fill="#10B981" />
                    <text
                        x={x + 15}
                        y={y + 30}
                        textAnchor="middle"
                        fontSize="8"
                        fill="white"
                    >
                        Н{i + 1}
                    </text>
                </g>
            )
        })}
        <text x="-70" y="-50" fontSize="8" fill="#10B981">
            Насосы: {workingPumps} раб + {reservePumps} рез
        </text>
    </>
)

const InletPipeline = ({ inletDiameter, extras }) => (
    <g>
        <line
            x1="-200"
            y1="50"
            x2="-100"
            y2="50"
            stroke="#F59E0B"
            strokeWidth="3"
        />
        <circle cx="-210" cy="50" r="8" fill="#F59E0B" />
        <text x="-230" y="45" fontSize="10" fill="#F59E0B">A</text>
        <text x="-200" y="30" fontSize="9" fill="#64748b">
            {inletDiameter}мм
        </text>

        {extras['Канальный измельчитель'] && (
            <g transform="translate(-160, 40)">
                <rect x="0" y="0" width="30" height="20" fill="#EF4444" opacity="0.6" rx="3" />
                <text x="15" y="12" textAnchor="middle" fontSize="8" fill="white">реш</text>
                <text x="15" y="30" fontSize="8" fill="#EF4444">1шт</text>
            </g>
        )}
    </g>
)

const OutletPipeline = ({ outletDiameter, extras }) => (
    <g>
        <line
            x1="100"
            y1="50"
            x2="200"
            y2="50"
            stroke="#F59E0B"
            strokeWidth="3"
        />
        <circle cx="210" cy="50" r="8" fill="#F59E0B" />
        <text x="220" y="45" fontSize="10" fill="#F59E0B">B</text>
        <text x="150" y="30" fontSize="9" fill="#64748b">
            {outletDiameter}мм
        </text>

        {extras['Шиберный затвор на подводящей трубе'] && (
            <g transform="translate(120, 40)">
                <rect x="0" y="0" width="20" height="20" fill="#8B5CF6" opacity="0.6" rx="2" />
                <text x="10" y="12" textAnchor="middle" fontSize="7" fill="white">з</text>
            </g>
        )}

        {extras['Расходомер на напорном трубопроводе'] && (
            <g transform="translate(150, 30)">
                <circle cx="0" cy="0" r="10" fill="#EC4899" opacity="0.6" />
                <text x="0" y="2" textAnchor="middle" fontSize="7" fill="white">FM</text>
            </g>
        )}
    </g>
)

const PreWell = () => (
    <g transform="translate(-120, 20)">
        <path d="M0,0 L10,-10 L20,0 L10,10 Z" fill="#8B5CF6" opacity="0.6" />
        <text x="10" y="0" textAnchor="middle" fontSize="7" fill="white">OK</text>
    </g>
)

const Pavilion = () => (
    <g transform="translate(-50, -220)">
        <rect
            x="0"
            y="0"
            width="100"
            height="60"
            fill="#8B5CF6"
            opacity="0.3"
            stroke="#8B5CF6"
            strokeWidth="2"
            rx="5"
        />
        <rect
            x="10"
            y="10"
            width="80"
            height="40"
            fill="white"
            stroke="#8B5CF6"
            strokeWidth="1"
            rx="3"
        />
        <circle cx="30" cy="20" r="3" fill="#8B5CF6" />
        <circle cx="70" cy="20" r="3" fill="#8B5CF6" />
        <text x="50" y="40" textAnchor="middle" fontSize="10" fill="#8B5CF6">
            Павильон
        </text>
        <text x="50" y="70" textAnchor="middle" fontSize="9" fill="#8B5CF6">
            Таль эл. 1шт
        </text>
    </g>
)

const Hoist = () => (
    <g transform="translate(150, -120)">
        <line x1="0" y1="0" x2="0" y2="40" stroke="#F59E0B" strokeWidth="2" />
        <circle cx="0" cy="-10" r="8" fill="#F59E0B" />
        <text x="15" y="0" fontSize="8" fill="#F59E0B">таль</text>
    </g>
)

const GasAnalyzer = () => (
    <g transform="translate(-150, -120)">
        <rect x="0" y="0" width="30" height="20" fill="#3B82F6" opacity="0.6" rx="3" />
        <text x="15" y="12" textAnchor="middle" fontSize="7" fill="white">GA</text>
    </g>
)

const SchemaLegend = ({ extras }) => {
    const activeExtras = Object.entries(extras).filter(([, value]) => value)

    if (activeExtras.length === 0) {
        return null
    }

    return (
        <g transform="translate(50, 500)">
            <text x="0" y="0" fontSize="12" fill="#1e293b" fontWeight="600">Комплектация:</text>

            {activeExtras.map(([key], index) => {
                let count = '1'
                if (key.includes('задвижк')) count = '4'
                if (key.includes('Обратный клапан')) count = '2'
                if (key.includes('Поплавковый')) count = '4'
                if (key.includes('Вентиляционная')) count = '2'
                if (key.includes('Цепь')) count = '3'
                if (key.includes('Направляющие')) count = '3'

                return (
                    <g key={key} transform={`translate(0, ${(index + 1) * 20})`}>
                        <circle cx="5" cy="5" r="3" fill="#4A85F6" />
                        <text x="15" y="8" fontSize="10" fill="#64748b">
                            {key} - {count} шт
                        </text>
                    </g>
                )
            })}
        </g>
    )
}

const SchemaDimensions = ({ inletDiameter, outletDiameter, stationDiameter, stationHeight }) => (
    <g transform="translate(650, 500)">
        <text x="0" y="0" fontSize="11" fill="#1e293b">Габариты:</text>
        <text x="0" y="20" fontSize="10" fill="#64748b">A: вх. {inletDiameter}мм</text>
        <text x="0" y="35" fontSize="10" fill="#64748b">B: вых. {outletDiameter}мм</text>
        <text x="0" y="50" fontSize="10" fill="#64748b">C: станция ⌀{stationDiameter}м</text>
        <text x="0" y="65" fontSize="10" fill="#64748b">H: {stationHeight}м</text>
    </g>
)