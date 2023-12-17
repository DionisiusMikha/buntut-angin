
// import React from 'react'
// import './try.css'

// const Try = () => {
//     // const { login, username, password, error } =
//     //     LoginViewModel();

//     return (
//         <h1 class="text-3xl font-bold underline">
//             Hello world!
//         </h1>
//     );
// };

// export default Try;

// import React, { PureComponent } from 'react';
// import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'Page E',
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

// class Try extends PureComponent {
//   render() {
//     return (
//       <div style={{height:"100vh", weight : "100vh", backgroundColor:"red"}}>
//         <ResponsiveContainer width="100%" height="100%">
//             <BarChart width={150} height={40} data={data}>
//             <Bar dataKey="uv" fill="#8884d8" />
//             </BarChart>
//         </ResponsiveContainer>
//       </div>
//     );
//   }
// }

// export default Try


// npx tailwindcss build ./src/index.css -o ./src/Component/navstyle.css


// import React, {useState} from 'react';
// import api from '../../Services/api';
// import admin from '../../Services/Admin/admin';

// function Try(){
// 	const [selectedFile, setSelectedFile] = useState();
// 	const [isFilePicked, setIsFilePicked] = useState(false);
//   const [hasil, setHasil] = useState();

// 	const changeHandler = (event) => {
// 		setSelectedFile(event.target.files[0]);
// 		setIsFilePicked(true);
// 	};

// 	const handleSubmission = async() => {
// 		const formData = new FormData();

// 		formData.append('file', selectedFile);

//     // console.log(formData);
//     const res = await admin.uploadImage(formData);
//     console.log(res.data)

//     // const res = await api.upload(formData)
//     // console.log(res)

//     // const a = URL.createObjectURL(selectedFile);
//     // setHasil(a)
//     // console.log("a", hasil)

// 		// fetch(
// 		// 	'https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5',
// 		// 	{
// 		// 		method: 'POST',
// 		// 		body: formData,
// 		// 	}
// 		// )
// 		// 	.then((response) => response.json())
// 		// 	.then((result) => {
// 		// 		console.log('Success:', result);
// 		// 	})
// 		// 	.catch((error) => {
// 		// 		console.error('Error:', error);
// 		// 	});
// 	};
  
// 	return(
//     <div>
// 			<input type="file" name="file" onChange={changeHandler} />
// 			{isFilePicked ? (
//         <div>
// 					<p>Filename: {selectedFile.name}</p>
// 					<p>Filetype: {selectedFile.type}</p>
// 					<p>Size in bytes: {selectedFile.size}</p>
// 					<p>
// 						lastModifiedDate:{' '}
// 						{selectedFile.lastModifiedDate.toLocaleDateString()}
// 					</p>
// 				</div>
// 			) : (
//         <p>Select a file to show details</p>
//         )}
// 			<div>
// 				<button onClick={handleSubmission}>Submit</button>
// 			</div>
//       {/* <img src={hasil} alt="" /> */}
// 		</div>
// 	)

// };
// export default Try;

import * as React from 'react';
import Button from '@mui/material/Button';

export default function ButtonUsage() {
  return <Button variant="contained">Hello world</Button>;
}