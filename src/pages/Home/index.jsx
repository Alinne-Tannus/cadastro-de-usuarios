import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/icon-trash.png'
import api from '../../services/api'


function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputEmail = useRef()
  const inputAge = useRef()

  async function getUsers() {
    try {
      const response = await api.get('/users')
      console.log('Usuários retornados da API:', response.data)
      setUsers(response.data)
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
    }
  }

  async function createUsers() {
      try{
        await api.post('/users', {
          name: inputName.current.value,
          email: inputEmail.current.value,
          age: inputAge.current.value
        });
       } catch (error) {
        console.error('Erro ao criar usuário:', error)
        }
        getUsers();
    }

    async function deleteUser(id) {
      try {
        await api.delete(`/users/${id}`);
        getUsers();
      }
       catch (error) {
        console.error('Erro ao excluir usuário:', error);
      }
    }
  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='container'>
      <form className='formulario' action="">
        <h1 className='title'>Cadastro de Usuários</h1>
        <input name='name' type="text" placeholder='Nome'  ref={inputName}/>
        <input name='email' type="email" placeholder='E-mail' ref={inputEmail}/>
        <input name='age' type="number" placeholder='Idade' ref={inputAge}/>
        <button onClick={createUsers} type='button'>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div className='card' key={user.id}>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>E-mail: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUser(user.id)}>
            <img src={Trash} alt="Excluir" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Home
