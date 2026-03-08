import CheckboxFilter from "./checkboxFilter";

const SidebarFilter = () => {
    return (
        <div className="h-full w-64 border-r p-2 overflow-y-auto">
            <div>Prezzo</div>

            {/* Checkbox filters */}
            <div className="h-full flex flex-col gap-1">
                <CheckboxFilter label="Aria condizionata" />
                <CheckboxFilter label="Balcone" />
                <CheckboxFilter label="Portineria" />
                <CheckboxFilter label="Ascensore" />
                <CheckboxFilter label="Piano" />
                <CheckboxFilter label="Arredata" />
                <CheckboxFilter label="Garage" />
                <CheckboxFilter label="Giardino" />
                <CheckboxFilter label="Riscaldamenti" />
                <CheckboxFilter label="Posto auto" />
                <CheckboxFilter label="Pannelli solari" />
                <CheckboxFilter label="Terrazzo" />
            </div>
        </div>
    );
}

export default SidebarFilter;