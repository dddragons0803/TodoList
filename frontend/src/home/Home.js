import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TodoWrapper from "../pages/TodoWrapper"
export { Home };
// import Nav from '../Components/Nav';

function Home() {
    const auth = useSelector(state => state.auth);
    return (
        <div>
            
            <h1>Hi {auth.user.username}!</h1>
            <p>Mark your important Tasks Here !!!</p>
            <TodoWrapper />
        </div>  
    );
}