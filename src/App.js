import React from 'react';
import { Link } from "react-router-dom";
import { Route, Switch } from 'react-router-dom';
import "./App.css";
import * as BooksAPI from './BooksAPI';
import BookList from './BookList';
import escapeRegExp from 'escape-string-regexp';
import Search from './Search';
class BooksApp extends React.Component {
  state = {
    
    books:[],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }
  
  componentDidMount(){
     const books=BooksAPI.getAll().then((books)=>{
        this.setState({books:books});
      })
    }
    updateBook=(book,shelf)=>{
      BooksAPI.update(book,shelf).then(()=>{
        book.shelf=shelf;
        const books=this.state.books.filter(b=>b.id !== book.id).concat(book);
        this.setState({books:books});
      })
    }
  render() {
    console.log("NewBooks :",this.state.newBooks);
    const { books } = this.state;
    const { query, newBooks} = this.state;
    return (
      <div className="app">
      <Route
            path="/search"
            render={({ history }) => (
          <Search books={books} updateShelf={this.updateBook}/>
            )}
          /> 
          <Route
            exact
            path="/"
            render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
              <BookList shelf="currentlyReading" bookShelf={this.updateBook} books={this.state.books}/>
              <BookList shelf="wantToRead" bookShelf={this.updateBook} books={this.state.books}/>
              <BookList shelf="read" bookShelf={this.updateBook} books={this.state.books}/>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Search</Link>
            </div>
          </div>
          )}
         />
      </div>
    )
  }
}

export default BooksApp
