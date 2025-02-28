import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Footer = (props) => <p>Você tem {props.count} favoritos.</p>;

Footer.propTypes = {
    count: PropTypes.number.isRequired,
}

const mapStateToProps = state => ({
  count: state.favorites.data.length,
});

export default connect(mapStateToProps)(Footer);