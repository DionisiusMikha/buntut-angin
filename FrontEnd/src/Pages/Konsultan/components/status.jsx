// Dialog.jsx
import React from 'react';
import DoctorService from '../../../Services/konsultan/doctor';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';

const Status = ({ isOpen, onClose, user }) => {
    const done = async() => {
        try {
            const result = await DoctorService.changeStatus(user.id, 1);

            if(result.data.message == "updated"){
                onClose();
            }
        } catch (error) {
            throw error;
        }
    }

    const reject = async() => {
        try {
            const result = await DoctorService.changeStatus(user.id, 2);

            if(result.data.message == "updated"){
                onClose();
            }
        } catch (error) {
            throw error;
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>{user.nama}</ModalHeader>
            <ModalCloseButton />
            <ModalBody className='w-full flex flex-col gap-y-6'>
            {/* Dialog content goes here */}
            <h1 className='text-xl text-center font-bold'>Pilih Action</h1>
            <div className='w-full flex justify-evenly mb-4'>
                <button className='w-3/12 h-10 text-xl text-white bg-green-500 rounded' onClick={done}>Done</button>
                <button className='w-3/12 h-10 text-xl text-white bg-red-500 rounded' onClick={reject}>Reject</button>
            </div>
            </ModalBody>
        </ModalContent>
        </Modal>
    );
};

export default Status;
