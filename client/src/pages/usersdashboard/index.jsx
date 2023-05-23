import { useState } from "react";
import { getAllUsers,deleteUserById } from "../api/usersdashboard";
import { useQuery, useQueryClient } from "react-query";
import { Table, Checkbox } from "react-daisyui";
import Swal from "sweetalert2";
import axios from "axios";
// import EditMemberForm from "@/components/EditUser";


//fetch all data
//then map the product component
export default function usersdashboard() {
    const queryClient = useQueryClient();
    const { data } = useQuery("users", getAllUsers);

    // const handleEditMember = (id) => {
    //   const [showEditMemberForm, setShowEditMemberForm] = useState(false);
    //   setShowEditMemberForm(id);
    // };
  
    // const handleCloseEditMemberForm = () => {
    //   setShowEditMemberForm(false);
    // };
  
    // if (showEditMemberForm) {
    //   return (
    //     <EditMemberForm
    //       id={showEditMemberForm}
    //       onClose={handleCloseEditMemberForm}
    //     />
    //   );
    // }


      const handleDeleteMember = (id) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
        }).then(async (result) => {
          if (result.isConfirmed) {
            await deleteUserById(id);
            queryClient.invalidateQueries("users");
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        });
      };

    return (
        <div className='overflow-x-auto'>
            <Table className="rounded-box mx-auto">
                <Table.Head>
                <span>Name</span>
                <span>Username</span>
                <span>Email</span>
                <span>role</span>
                <span></span>   

                </Table.Head>
    
            <Table.Body>
            {data?.map((item, idx) => (
              <tr key={idx}>
                  <td>
                      {item.name}
                  </td>
                  <td>
                  <td>{item.username}</td>
                  </td>
                <td>{item.email}</td>
                <td>
                <select
                  value={item.role}
                  style={{ color: item.role === 'admin' ? 'green' : 'yellow' }}
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </td>
                <td>
                  <button
                    href=""
                    className="text-red-600 hover:text-red-500"
                    onClick={() => handleDeleteMember(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            </Table.Body>
    
            <Table.Footer>
              <span>&nbsp;</span>
              <span></span>
              <span></span>
              <span></span>   
              <span>&nbsp;</span>

            </Table.Footer>
          </Table>
        </div>
      )
}

  