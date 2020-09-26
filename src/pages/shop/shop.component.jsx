import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPage from '../collection/collection.component';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import {selectIsCollectionFetching , selectIsCollectionLoaded} from '../../redux/shop/shop.selector';


const CollectionsOverviewWithSpiner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpiner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  componentDidMount(){
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync()
  }

  render(){
    const {match, isFetchingCollection, isCollllectionLoaded} = this.props;
    return(
    <div className='shop-page'>
      <Route 
        exact 
        path={`${match.path}`} 
        render={(props) => (
          <CollectionsOverviewWithSpiner 
            isLoading={isFetchingCollection} 
            {...props} 
            />
          )}
        />
      <Route 
        path={`${match.path}/:collectionId`} 
        render={(props) =>(
          <CollectionPageWithSpiner isLoading={!isCollllectionLoaded} {...props} />
        )} />
    </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  isFetchingCollection: selectIsCollectionFetching,
  isCollllectionLoaded: selectIsCollectionLoaded
})
const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
