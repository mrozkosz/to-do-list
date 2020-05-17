import React from "react";
import MainSlider from './MainSlider';
import Background from '../img/bg.jpg';


class Logout extends React.Component {
    constructor(props) {
        super(props);
        setTimeout(() => {
            this.redirect()
        }, 30)
    }

    redirect() {
        localStorage.clear();
        this.props.params.setState({ isAuthenticated: false });
        console.log(this.props.p.history.goBack())
    }

    render() {
        return (
            <div>
                <MainSlider
                    Background={'https://www.rp.pl/apps/pbcsi.dll/storyimage/RP/20170629/NAUKA/170628945/AR/0/AR-170628945.jpg'} />
            </div>
        )
    }
}
export default Logout;