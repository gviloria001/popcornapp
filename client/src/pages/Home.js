import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div>
            <Link to={`/UsersPage`}> <button>123</button> </Link>
        </div>
    )
}