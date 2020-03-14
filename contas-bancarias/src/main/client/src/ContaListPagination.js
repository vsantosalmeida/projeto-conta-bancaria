import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

const ANTERIOR = 'ANTERIOR';
const PROXIMA = 'PRÓXIMA';

const range = (from, to, step = 1) => {
    let i = from;
    const range = [];
  
    while (i <= to) {
      range.push(i);
      i += step;
    }
  
    return range;
  }

class ContaListPagination extends Component {
    
    constructor(props) {
        super(props);
        const { totalElements = null, pageLimit = 10, pagesOver = 0 } = props;
    
        this.pageLimit = typeof pageLimit === 'number' ? pageLimit : 10;
        this.totalElements = typeof totalElements === 'number' ? totalElements : 0;
    
        this.pagesOver = typeof pagesOver === 'number'
          ? Math.max(0, Math.min(pagesOver, 2))
          : 0;
    
        this.totalPages = Math.ceil(this.totalElements / this.pageLimit);
    
        this.state = { currentPage: 1 };
    }

    fetchPageNumbers = () => {

        const totalPages = this.totalPages;
        const currentPage = this.state.currentPage;
        const pagesOver = this.pagesOver;
    

        const totalNumbers = (this.pagesOver * 2) + 3;
        const totalBlocks = totalNumbers + 2;
    
        if (totalPages > totalBlocks) {
    
          const startPage = Math.max(2, currentPage - pagesOver);
          const endPage = Math.min(totalPages - 1, currentPage + pagesOver);
    
          let pages = range(startPage, endPage);
    

          const hasLeftSpill = startPage > 2;
          const hasRightSpill = (totalPages - endPage) > 1;
          const spillOffset = totalNumbers - (pages.length + 1);
    
          switch (true) {

            case (hasLeftSpill && !hasRightSpill): {
              const extraPages = range(startPage - spillOffset, startPage - 1);
              pages = [ANTERIOR, ...extraPages, ...pages];
              break;
            }
    
            case (!hasLeftSpill && hasRightSpill): {
              const extraPages = range(endPage + 1, endPage + spillOffset);
              pages = [...pages, ...extraPages, PROXIMA];
              break;
            }
    
            case (hasLeftSpill && hasRightSpill):
            default: {
              pages = [ANTERIOR, ...pages, PROXIMA];
              break;
            }
          }
    
          return [1, ...pages, totalPages];
    
        }
    
        return range(1, totalPages);
    
      }

      componentDidMount() {
        this.gotoPage(1);
      }
    
      gotoPage = page => {
        const { onPageChanged = f => f } = this.props;
    
        const currentPage = Math.max(0, Math.min(page, this.totalPages));
    
        const paginationData = {
          currentPage,
          totalPages: this.totalPages,
          pageLimit: this.pageLimit,
          totalElements: this.totalElements
        };
    
        this.setState({ currentPage }, () => onPageChanged(paginationData));
      }
    
      handleClick = page => evt => {
        evt.preventDefault();
        this.gotoPage(page);
      }
    
      handleMoveLeft = evt => {
        evt.preventDefault();
        this.gotoPage(this.state.currentPage - (this.pagesOver * 2) - 1);
      }
    
      handleMoveRight = evt => {
        evt.preventDefault();
        this.gotoPage(this.state.currentPage + (this.pagesOver * 2) + 1);
      }
    

      render() {

        if (!this.totalElements || this.totalPages === 1) return null;
    
        const { currentPage } = this.state;
        const pages = this.fetchPageNumbers();
    
        return (
          <Fragment>
            <nav aria-label="Countries Pagination">
              <ul className="pagination">
                { pages.map((page, index) => {
    
                  if (page === ANTERIOR) return (
                    <li key={index} className="page-item">
                      <a className="page-link" href="#" aria-label="Previous" onClick={this.handleMoveLeft}>
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                      </a>
                    </li>
                  );
    
                  if (page === PROXIMA) return (
                    <li key={index} className="page-item">
                      <a className="page-link" href="#" aria-label="Next" onClick={this.handleMoveRight}>
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                      </a>
                    </li>
                  );
    
                  return (
                    <li key={index} className={`page-item${ currentPage === page ? ' active' : ''}`}>
                      <a className="page-link" href="#" onClick={ this.handleClick(page) }>{ page }</a>
                    </li>
                  );
    
                }) }
    
              </ul>
            </nav>
          </Fragment>
        );
    
      }
    
    
    }
    
    ContaListPagination.propTypes = {
      totalElements: PropTypes.number.isRequired,
      pageLimit: PropTypes.number,
      pagesOver: PropTypes.number,
      onPageChanged: PropTypes.func

};
export default ContaListPagination;