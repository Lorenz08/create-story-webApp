const e = React.createElement;
const { makeStyles, Grid, IconButton, Icon, Card, CardHeader, CardContent, CardActions, Link, Paper } = MaterialUI;

export default function CardStory(props){
    const useStyles_card = makeStyles((theme) => ({
        root: {
            width: "250px",
            height: "180px",
            float: screen.width >= 800 ? "left" : "none",
            margin: "8px",
            textAlign: "center",
            position: "relative",
            backgroundImage: `url(http://site181997.tw.cs.unibo.it/server/upload/${props.img})`,
            backgroundSize: "250px 180px",
        },
    }));
    const classes_card = useStyles_card();

    return(
        e(Card, {key: props.id, className: classes_card.root, raised: true, children: [
            e(Link, {key: "1", href: props.url, color: "inherit", underline: "none", style: {border: 0}}, [
                e(CardHeader, {key: "cardHeader", style: {color: "white", backgroundColor: "rgba(0,0,0,0.4)"}, title: props.title}),
                e(CardActions, { key: "2", disableSpacing: true, children: [
                    e(Grid, {style: {position: "absolute", bottom: 8}, container: true, children: e(Paper, {style: {backgroundColor: "white"}}, [
                        e(Icon, {children: "person", color: "primary", style: {float: "left"}}),
                        e("p", {key: "p1", style: {float: "right", marginRight: 5, fontSize: "20px", fontWeight: "bold", marginLeft: 10, color: "black"}}, props.nPlayers),
                    ])}),
                ]}),
            ]),
        ]})
    );
}
