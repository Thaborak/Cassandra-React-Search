import React from 'react';
import { connect } from 'react-redux';
// import Select from 'react-select';
 import 'react-select/dist/react-select.css'
 import './Search.css'
// import 'react-virtualized-select/styles.css'
import { fetchLocations, setSearchResults } from './location-actions';
import { Async } from 'react-select';

export class Search extends React.Component {

    componentDidMount() {
        this.props.dispatch(fetchLocations())
    }


    state = {
        selectedOptionLocation: '',
        error: false,
    };

    _handleSubmit = () => {
        this.props.dispatch(setSearchResults({ city: this.state.selectedOptionLocation.value }));
    };


    handleChangeLocation = (selectedOptionLocation) => {
        this.setState({ selectedOptionLocation });
    }

 
    

    render() {
        const { selectedOptionLocation } = this.state;
        const locationValue = selectedOptionLocation && selectedOptionLocation.value;
        const locations = this.props.locations;

        const getOptions = (input, callback) => {
            setTimeout(() => {
                callback(null, {
                    options: 
                        locations.map(el => {
                            return { value: el.city, label: el.state };
                        }),
                    // CAREFUL! Only set this to true when there are no more options,
                    // or more specific queries will not be sent to the server.
                    complete: true
                });
            }, 300);
        };

        if (this.state.error) {
            return (
                <div>
                    <h1>Something went wrong</h1>
                </div>
            );
        }
        return (
            <div className="col-4" >
                <div className="concert-search-form-container">
                    <h1 className='page-title'>Find which State each City is Located</h1>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        this._handleSubmit();
                    }}>
                        <div className="location">
                            <h4 className="form-label">Location:</h4>
                            <Async
                                name="form-field-location"
                                className="select-box"            
                                value={locationValue}
                                onChange={this.handleChangeLocation}
                                loadOptions={getOptions}
                            />
                        </div>
                    </form>
                </div>
            </div>
        );


    }
}
const mapStateToProps = state => ({
    locations: state.location.locations
});
export default connect(mapStateToProps)(Search);



