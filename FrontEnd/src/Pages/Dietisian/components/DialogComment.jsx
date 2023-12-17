import React, { useState } from 'react';
import axios from 'axios';
import DietisianService from '../../../Services/Dietisian/dietisian';
import { useForm } from 'react-hook-form';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import Rating from '@mui/material/Rating';


const DialogComment = ({ isOpen, onClose, recipeId, userId }) => {
    const { register, watch } = useForm();
    const [rating, setRating] = useState(0);
    
    const updateRatingComment = async () => {
        const res = await DietisianService.addRatingComment(recipeId, userId, rating, watch('comment'));
        if (res.status == 200){
            onClose();
            window.location.reload();
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Give Us Rating for this Recipe</ModalHeader>
            <ModalCloseButton />
            <ModalBody className='w-full flex flex-col gap-y-2'>
                <div className='w-fit'>
                    <Rating name="half-rating" defaultValue={0} precision={0.5} onChange={(e)=>{
                        setRating(e.target.value)
                    }}/>
                </div>
                <textarea type="text" {...register('comment')} className='border rounded-xl py-2 px-3 h-36' placeholder='Add Your Comment Here'/>
                <div className='w-full flex justify-center mb-3'>
                    <button className='w-4/12 h-10 bg-blue-200 rounded-xl' onClick={updateRatingComment}>Add</button>
                </div>
            </ModalBody>
        </ModalContent>
        </Modal>
    );
};

export default DialogComment;