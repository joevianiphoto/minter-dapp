import React from "react";  
import { Dropdown, Dimmer, Loader } from "semantic-ui-react"; 
import axios from 'axios';
 
export default class App extends React.Component { 
    constructor(props) {
        super(props);
 
        this.state = {
            name : "",
            AccentFurs: [],
            Backgrounds: [],
            BodyFs: [],
            BodyPs: [],
            Borders: [],
            Eyess: [],
            Matss: [],
            Mouths: [],
            NeckDecorations: [],
            Toyss: [],
            Toys2: [], 
            AccentFursIndex: 2,
            BackgroundsIndex: 1,
            BodyIndex: 3, 
            BordersIndex: 0,
            EyessIndex: 1,
            MatssIndex: 0,
            MouthsIndex: 13,
            NeckDecorationsIndex: 3,
            ToyssIndex: 2,
            Toys2Index: 4,  
            Highlights: '/Content/Layers/Highlights/Highlights.png', 
            Nose: '/Content/Layers/Nose/Nose.png',
            Shadows: '/Content/Layers/Shadows/Shadows.png'  , 
            isLoading :  false
        };  
    } 
      
    componentDidMount() {
        var AccentFurs = [];
        var Backgrounds = [];
        var BodyFs = [];
        var BodyPs = [];
        var Borders = [];
        var Eyess = [];
        var Matss = [];
        var Mouths = [];
        var NeckDecorations = [];
        var Toyss = [];
        var Toys2 = [];

        this.getlayers("AccentFur").then((result) => {
            AccentFurs = result;
            this.getlayers("Background").then((result) => {
                Backgrounds = result;
                this.getlayers("Body").then((result) => {
                    BodyFs = result;
                    this.getlayers("BodyP").then((result) => {
                        BodyPs = result;
                        this.getlayers("Border").then((result) => {
                            Borders = result;
                            this.getlayers("Eyes").then((result) => {
                                Eyess = result;
                                this.getlayers("Mat").then((result) => {
                                    Matss = result;
                                    this.getlayers("Mouth").then((result) => {
                                        Mouths = result;
                                        this.getlayers("Neck Decoration").then((result) => {
                                            NeckDecorations = result;
                                            this.getlayers("Toys").then((result) => {
                                                Toyss = result;
                                                this.getlayers("Toys2").then((result) => {
                                                    Toys2 = result;
                                                    this.setState({
                                                        AccentFurs: AccentFurs,
                                                        Backgrounds: Backgrounds,
                                                        BodyFs: BodyFs,
                                                        BodyPs: BodyPs,
                                                        Borders: Borders,
                                                        Eyess: Eyess,
                                                        Matss: Matss,
                                                        Mouths: Mouths,
                                                        NeckDecorations: NeckDecorations,
                                                        Toyss: Toyss,
                                                        Toys2: Toys2,
                                                    }); 
                                                }, (error) => { })
                                            }, (error) => { })
                                        }, (error) => { })
                                    }, (error) => { })
                                }, (error) => { })
                            }, (error) => { })
                        }, (error) => { })
                    }, (error) => { })
                }, (error) => { })
            }, (error) => { }) 
        }, (error) => { }) 
    }  

    getlayers(which) { 
        return new Promise((resolve, reject) => {  
            /*const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');*/
            fetch(this.props.api_url + "Layers/layers?which=" + which,
            {
                method: "GET"
            })
                .then((res) => {
                return res.json();
            })
                .then((json) => {
                    if (json.success) {
                        resolve(json.data);
                    } else {
                        resolve([]);
                    }
                }).catch(error => { resolve([]) });
            }); 
    }


    create() {  
        let me = this;
         
        if (me.state.name == "") {
            alert('Please give your puppy a name.');
            return;
        }

        //const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

        me.setState({ isLoading: true });
          
        let bodytouse = this.state.Borders[this.state.BordersIndex].value == '/Content/Layers/Border/Body Pointed Ears.png' ?
            this.state.BodyPs : this.state.BodyFs;

        let data = JSON.stringify([ 
                me.state.name,
                me.state.Backgrounds[me.state.BackgroundsIndex].value,
                me.state.Matss[me.state.MatssIndex].value,
                bodytouse[me.state.BodyIndex].value,
                me.state.AccentFurs[me.state.AccentFursIndex].value,
                me.state.Highlights,
                me.state.Borders[me.state.BordersIndex].value,
                me.state.NeckDecorations[me.state.NeckDecorationsIndex].value,
                me.state.Eyess[me.state.EyessIndex].value,
                me.state.Nose,
                me.state.Shadows, 
                me.state.Mouths[me.state.MouthsIndex].value, 
                me.state.Toyss[me.state.ToyssIndex].value,
                me.state.Toys2[me.state.Toys2Index].value]); 
          
        axios.post(this.props.api_url + "Layers/create", data,
            { headers: { Pragma: 'no-cache', 'Content-Type': 'application/json' } })
            .then(res => {
                me.setState({ isLoading: false });
                if (res.data.success) {
                    me.global_download(res.data.data, res.data.name);
                } else {
                    alert(res.data.message); 
                }
            }).catch(error => {
                alert(error.message);
                me.setState({ isLoading: false });
            });   
    }
     
 
    getOptions(values) {
        return values.map((p, i) => ({
            key: i,
            text: p.name,
            value: p.index,
        }));
    }  

    global_download(b64, name) {
        //For IE using atob convert base64 encoded data to byte array
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            var byteCharacters = atob(b64);
            var byteNumbers = new Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            var blob = new Blob([byteArray], {
                type: 'application/pdf'
            });
            window.navigator.msSaveOrOpenBlob(blob, name);
        } else {
            // Directly use base 64 encoded data for rest browsers (not IE) 
            var link = document.createElement('a');
            link.innerHTML = name;
            link.download = name;
            link.href = 'data:application/octet-stream;base64,' + b64;
            link.click();
        }
    }


    render() {  

        var bodytouse = [];
       

        if (this.state.Toys2.length > 0) {

            if (this.state.Borders[this.state.BordersIndex].value == '/Content/Layers/Border/Body Pointed Ears.png') {
                bodytouse = this.state.BodyPs;
            } else {
                bodytouse = this.state.BodyFs;
            }  

            return (<React.Fragment>
                <div className="row">
                    <div className="large-3 columns"> 
                        <label>Name:</label>
                        <input type="text" id="name" 
                            onChange={(event) => this.setState({ name: event.target.value })} value={this.state.name} />

                        <label>Background:</label>
                        <Dropdown id={"body"}
                            fluid
                            selection
                            options={this.getOptions(this.state.Backgrounds)}
                            placeholder={"Select Body Color"}
                            defaultValue={this.state.BackgroundsIndex}
                            onChange={(e, { value }) => {
                                this.setState({
                                    BackgroundsIndex: value
                                });
                            }}
                            className="dropdown"
                        /> 
                            <label>Border:</label>
                            <Dropdown id={"border"}
                                fluid
                                selection
                                options={this.getOptions(this.state.Borders)}
                                placeholder={"Select Border"}
                                defaultValue={this.state.BordersIndex}
                                onChange={(e, { value }) => {
                                    this.setState({
                                        BordersIndex: value
                                    });
                                }}
                                className="dropdown"
                            />  
                            <label>Body:</label>
                            <Dropdown id={"body"}
                                fluid
                                selection
                                options={this.getOptions(bodytouse)}
                                placeholder={"Select Body Color"}
                                defaultValue={this.state.BodyIndex}
                                onChange={(e, { value }) => {
                                    this.setState({
                                        BodyIndex: value
                                    });
                                }}
                                className="dropdown"
                            /> 
                        <label>AccentFurs:</label>
                        <Dropdown id={"body"}
                            fluid
                            selection
                            options={this.getOptions(this.state.AccentFurs)}
                            placeholder={"Select Body Color"}
                            defaultValue={this.state.AccentFursIndex}
                            onChange={(e, { value }) => {
                                this.setState({
                                    AccentFursIndex: value
                                });
                            }}
                            className="dropdown"
                        /> 
                        <label>Eyes:</label>
                        <Dropdown id={"body"}
                            fluid
                            selection
                            options={this.getOptions(this.state.Eyess)}
                            placeholder={"Select Body Color"}
                            defaultValue={this.state.EyessIndex}
                            onChange={(e, { value }) => {
                                this.setState({
                                    EyessIndex: value
                                });
                            }}
                            className="dropdown"
                        /> 
                        <label>Mouth:</label>
                        <Dropdown id={"body"}
                            fluid
                            selection
                            options={this.getOptions(this.state.Mouths)}
                            placeholder={"Select Body Color"}
                            defaultValue={this.state.MouthsIndex}
                            onChange={(e, { value }) => {
                                this.setState({
                                    MouthsIndex: value
                                });
                            }}
                            className="dropdown"
                        /> 
                        <label>Floor Mat:</label>
                        <Dropdown id={"body"}
                            fluid
                            selection
                            options={this.getOptions(this.state.Matss)}
                            placeholder={"Select Body Color"}
                            defaultValue={this.state.MatssIndex}
                            onChange={(e, { value }) => {
                                this.setState({
                                    MatssIndex: value
                                });
                            }}
                            className="dropdown"
                        /> 
                        <label>Neck Decoration:</label>
                        <Dropdown id={"body"}
                            fluid
                            selection
                            options={this.getOptions(this.state.NeckDecorations)}
                            placeholder={"Select Body Color"}
                            defaultValue={this.state.NeckDecorationsIndex}
                            onChange={(e, { value }) => {
                                this.setState({
                                    NeckDecorationsIndex: value
                                });
                            }}
                            className="dropdown"
                        /> 
                        <label>Toy Right:</label>
                        <Dropdown id={"body"}
                            fluid
                            selection
                            options={this.getOptions(this.state.Toyss)}
                            placeholder={"Select Body Color"}
                            defaultValue={this.state.ToyssIndex}
                            onChange={(e, { value }) => {
                                this.setState({
                                    ToyssIndex: value
                                });
                            }}
                            className="dropdown"
                        /> 
                        <label>Toy Left:</label>
                        <Dropdown id={"body"}
                            fluid
                            selection
                            options={this.getOptions(this.state.Toys2)}
                            placeholder={"Select Body Color"}
                            defaultValue={this.state.Toys2Index}
                            onChange={(e, { value }) => {
                                this.setState({
                                    Toys2Index: value
                                });
                            }}
                            className="dropdown"
                        />  

                        <button onClick={() => { this.create() } } >Create</button>
                    </div> 
                    <div className="large-9 columns">
                        <div className="container">
                        <img alt="" src={this.props.api_url + this.state.Backgrounds[this.state.BackgroundsIndex].value} className="layers" />
                        <img alt="" src={this.props.api_url + this.state.Matss[this.state.MatssIndex].value} className="layers" /> 
                        <img alt="" src={this.props.api_url + bodytouse[this.state.BodyIndex].value} className="layers" /> 
                        <img alt="" src={this.props.api_url + this.state.AccentFurs[this.state.AccentFursIndex].value} className="layers" />
                        <img alt="" src={this.props.api_url + this.state.Highlights} className="layers" />
                        <img alt="" src={this.props.api_url + this.state.Borders[this.state.BordersIndex].value} className="layers" />
                        <img alt="" src={this.props.api_url + this.state.NeckDecorations[this.state.NeckDecorationsIndex].value} className="layers" />
                        <img alt="" src={this.props.api_url + this.state.Eyess[this.state.EyessIndex].value} className="layers" />
                        <img alt="" src={this.props.api_url + this.state.Nose} className="layers" />
                        <img alt="" src={this.props.api_url + this.state.Shadows} className="layers" />
                        <img alt="" src={this.props.api_url + this.state.Mouths[this.state.MouthsIndex].value} className="layers" />
                        <img alt="" src={this.props.api_url + this.state.Toyss[this.state.ToyssIndex].value} className="layers" />
                            <img alt="" src={this.props.api_url + this.state.Toys2[this.state.Toys2Index].value} className="layers" />
                        </div>
                    </div> 
                </div>
                <Dimmer active={this.state.isLoading} inverted key={'spinner'} ><Loader></Loader></Dimmer>
            </React.Fragment>);
        } else {
            return (<React.Fragment> 
                <div className="toolbar">
                    Loading...
                </div></React.Fragment>) ; 
        }  
    }
}  
 