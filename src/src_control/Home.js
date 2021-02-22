import CardStory from './components/CardStory.js';
import { getStories } from './API.js';
const e = React.createElement;

export default function Home(props){
    const [stories, setStories] = React.useState([]);

    const uploadCard = (stories, nPlayers) => {
        const arryOfStories = [];
        stories.forEach((story) => {
            arryOfStories.push( e(CardStory, { key: story.id, id: story.id, img: story.img, title: story.title, nPlayers: nPlayers[story.id], url: `./?#/Home/Control/${story.id}` }) );
        })
        setStories(arryOfStories);
    };
 
    React.useEffect(() => {
        (async () => {
            const {stories, nPlayers} = await getStories();
            uploadCard(stories, nPlayers);
        })();
    }, []);

    return e(React.Fragment, {key: "control_home_root"}, [
        e("div", {style: {padding: 10, height: "100%", width: "100%", marginBottom: 100}}, [
            e("div", {className:"containerHome_userSelected"}, [
                e("p", null, `STORIE ATTIVE`),
            ]),
            e("div", {key: "1", className: "container_stories"}, [ stories.length > 0 ? stories : "NON CI SONO STORIE ATTIVE" ] ),
        ])
    ])}