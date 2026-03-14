import { CardAppointment } from "./components/cardAppointment";

export default function Appointments() {
    return (
        <div className="w-full h-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2">
                <CardAppointment />
                <CardAppointment />
                <CardAppointment />
                <CardAppointment />
                <CardAppointment />
            </div>
        </div>
    );
}