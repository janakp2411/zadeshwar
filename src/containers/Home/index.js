import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Carousel from '../../components/app/Carousel/index';
import MenuBar from '../../components/app/MenuBar/index';
import { requestHelloWorld } from "../../actions/index";

class Home extends React.Component {
  componentDidMount() {
    // this.props.requestHelloWorld();
  }

  render() {
    return (
      <div>
        <Carousel />
        <MenuBar />
      </div>
    );
  }
}

const mapStateToProps = state => ({ helloWorld: state.helloWorld });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestHelloWorld }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
