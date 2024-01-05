// Dialog.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import DietisianService from '../../../Services/Dietisian/dietisian';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';

const Status = ({ isOpen, onClose, doctor_id, user_id }) => {
    const { register, watch } = useForm();

    const ajukan = async() => {
        try {
            const result = await DietisianService.ajukanKonsultasi(doctor_id, user_id, watch("tanggal"), watch("jam"));
            if (result.status == 400){
                alert("Jadwal tabrakan")
            }
            onClose();
        } catch (error) {
            throw error;
        }
    }
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Ajukan Jadwal Konsultasi</ModalHeader>
            <ModalCloseButton />
            <ModalBody className='w-full flex flex-col gap-y-6'>
            {/* Dialog content goes here */}
            <div className='w-full flex justify-center mb-4 gap-x-8'>
                <input type="date" className='w-40 border-2 border-black px-3 rounded' {...register("tanggal")}/>
                <input type="time" className='w-40 border-2 border-black px-3 rounded' {...register("jam")}/>
            </div>
            <div className='w-full flex justify-center mb-4'>
                <button className='w-1/2 h-8 border border-gray-400 rounded-lg shadow-lg hover:shadow-xl' onClick={ajukan}>Ajukan</button>
            </div>
            </ModalBody>
        </ModalContent>
        </Modal>
    );
};

export default Status;
