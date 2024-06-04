import SectionCollections from "../components/SectionCollections";
import SectionGift from "../components/SectionGift";
import SectionTop from "../components/SectionTop";

const Home = () => {
    return (
        <main className="main">
            <div className="container">
                <SectionTop />
                <SectionCollections />
                <SectionGift />
            </div>
        </main>
    )
}

export default Home;