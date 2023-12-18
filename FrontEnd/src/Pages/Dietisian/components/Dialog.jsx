// Dialog.jsx
import React from 'react';
import DietisianService from '../../../Services/Dietisian/dietisian';
import { useForm } from 'react-hook-form';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';

const Dialog = ({ isOpen, onClose, userId }) => {
    console.log(userId)
    const { register, watch } = useForm();
    
    const updateProfilePicture = async () => {
        const formData = new FormData();
        formData.append('file', watch('profile_picture')[0]);
        
        try {
            const response = await DietisianService.uploadProfilePicture(formData, userId);
    
            console.log('Response:', response.data);
            if (response.status === 200) {
                onClose();
                window.location.reload();
            }
        } catch (error) {
            console.error('Error updating profile picture:', error);
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Upload Profile Picture</ModalHeader>
            <ModalCloseButton />
            <ModalBody className='w-full flex flex-col gap-y-6'>
            {/* Dialog content goes here */}
            <p>Please upload profile picture</p>
            <input type="file" {...register('profile_picture')} />
            <div className='w-full flex justify-center'>
                <button className='w-2/12 h-8' onClick={updateProfilePicture}>Update</button>
            </div>
            </ModalBody>
        </ModalContent>
        </Modal>
    );
};

export default Dialog;
