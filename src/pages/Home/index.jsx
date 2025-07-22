// Importando os hooks necessários do React
import { useEffect, useState, useRef } from 'react'

// Importando o CSS e os ícones necessários
import './style.css'
import Trash from '../../assets/icon-trash.png'
import Edit from '../../assets/icon-edit.png'

// Importando o serviço de API para fazer requisições
import api from '../../services/api'

function Home() {
  // Declarando os estados necessários para o componente
  const [users, setUsers] = useState([])
  const [modalAberto, setModalAberto] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  // Funções para abrir e fechar o modal de edição

  function abrirModalEditar(usuario) {
    if (!usuario?.id) {
      console.error('Usuário inválido para edição:', usuario);
      return;
    }
    setUsuarioEditando({
      id: usuario.id, // ESSENCIAL!!!
      name: usuario.name,
      email: usuario.email,
      age: usuario.age
    });
    setModalAberto(true);  // abre o modal
  }
  function fecharModal() {
    setModalAberto(false); // fecha o modal
  }

  /*     O que ainda tem para fazer?
      - Criar a funcionalidade de editar usuário,
      - Criar a funcionalidade de deletar todos os usuários,
      - Criar a funcionalidade de ter um log para mostrar as edições e exclusões de usuários,
  */

  // Referências para os inputs do formulário
  const inputName = useRef()
  const inputEmail = useRef()
  const inputAge = useRef()

  // Funções assíncronas para interagir com a API
  // Função para buscar usuários da API
  async function getUsers() {
    try {
      const response = await api.get('/users')
      console.log('Usuários retornados da API:', response.data)
      setUsers(response.data)
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
    }
  }

  /* Função para criar um novo usuário
  Ela utiliza os valores dos inputs para enviar uma requisição POST à API
  Após criar o usuário, ela chama a função getUsers para atualizar a lista de usuários*/
  async function createUsers() {
    try {
      await api.post('/users/', {
        name: inputName.current.value,
        email: inputEmail.current.value,
        age: inputAge.current.value
      });
    } catch (error) {
      console.error('Erro ao criar usuário:', error)
    }
    getUsers();
  }


  // Função para deletar um usuário
  async function deleteUser(id) {
    try {
      await api.delete(`/users/${id}`);
      getUsers();
    }
    catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  }

  /* Função para criar um usuário aleatório
   Ela chama a API para criar um usuário com dados aleatórios*/
  async function createRandomUser() {
    try {
      await api.post('/users/criador-de-users');
      await getUsers();
    } catch (error) {
      console.error('Erro ao criar usuário aleatório:', error);
    }
  }

  // Função para editar um usuário
  async function editarUsuario(id) {
    console.log('Editando usuário com id:', id);
    if (!id) {
      console.error('ID inválido ao editar usuário:', id);
      return;
    }
    try {
      await api.put(`/users/${id}`, {
        name: usuarioEditando.name,
        email: usuarioEditando.email,
        age: Number(usuarioEditando.age)
      });
      fecharModal();
      getUsers();
    } catch (error) {
      console.error('Erro ao editar usuário:', error);
    }
  }
  async function deleteAllUsers(id) {
    try {
      await api.delete('/users');
      await getUsers();
    } catch (error) {
      console.error('Erro ao deletar todos os usuários:', error);
    }
  }

  /* Efeito colateral para buscar usuários quando o componente é montado
   e para adicionar ou remover a classe 'modal-aberto' no body quando o modal é aberto ou fechado*/
  useEffect(() => {
    getUsers()
    if (modalAberto) {
      document.body.classList.add('modal-aberto');
    } else {
      document.body.classList.remove('modal-aberto');
    }
  }, [modalAberto]);


  // Renderizando o componente Home
  // Ele exibe um formulário para cadastro de usuários e uma lista de usuários cadastrados
  // Cada usuário tem botões para editar e excluir
  return (
    <div className='container'>
      <form className='formulario' action="">
        <h1 className='title'>Cadastro de Usuários</h1>
        <input name='name' type="text" placeholder='Nome' ref={inputName} />
        <input name='email' type="email" placeholder='E-mail' ref={inputEmail} />
        <input name='age' type="number" placeholder='Idade' ref={inputAge} />
        <button className='btn-cadastrar' onClick={createUsers} type='button'>Cadastrar</button>
        <button className='btn-random' onClick={createRandomUser} type='button'> Criar usuário aleatório</button>
        <button className='btn-delete-all' onClick={deleteAllUsers} type='button'> Deletar todos os usuários</button>
      </form>

      {/* Modal para edição de usuário */}
      {modalAberto && (
        <div className="modal-content">
          <div className="modal">
            <h2 className="title-edit"> Editar Usuário</h2>
            <input placeholder='Nome' value={usuarioEditando?.name || ''} onChange={(e) => setUsuarioEditando({ ...usuarioEditando, name: e.target.value })} />
            <input placeholder='Email' value={usuarioEditando?.email || ''} onChange={(e) => setUsuarioEditando({ ...usuarioEditando, email: e.target.value })} />
            <input placeholder='Idade' value={usuarioEditando?.age || ''} onChange={(e) => setUsuarioEditando({ ...usuarioEditando, age: e.target.value })} />

            <button className="btn-edit" onClick={() => editarUsuario(usuarioEditando.id)}>Salvar</button>
            <button className="btn-close" onClick={fecharModal}>Fechar</button>
          </div>
        </div>
      )}
      {/* Lista de usuários cadastrados*/}
      {users.map((user) => (
        <div className='card' key={user.id}>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>E-mail: <span>{user.email}</span></p>
          </div>
          <div className="area-btn">
            <button onClick={() => abrirModalEditar(user)}>
              <img src={Edit} alt="Editar" />
            </button>
            <button onClick={() => deleteUser(user.id)}>
              <img src={Trash} alt="Excluir" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
export default Home
