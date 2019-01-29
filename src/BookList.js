import React,{Component} from 'react';
import { Link } from "react-router-dom";
import escapeRegExp from 'escape-string-regexp'
class BookList extends Component{
	render(){
		return(
			<React.Fragment>
                <div className="bookshelf" >
                  <h2 className="bookshelf-title">{this.props.shelf}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.props.books.map((book)=>(
                      (book.shelf===this.props.shelf &&(
	                      <li key={book.id}>
	                       <div className="book">
	                          <div className="book-top">
	                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
	                            <div className="book-shelf-changer">
	                              <select value={book.shelf} onChange={(event)=>this.props.bookShelf(book,event.target.value)}>
	                                <option value="move" disabled>Move to...</option>
	                                <option value="currentlyReading">Currently Reading</option>
	                                <option value="wantToRead">Want to Read</option>
	                                <option value="read">Read</option>
	                                <option value="none">None</option>
	                              </select>
	                            </div>
	                          </div>
	                          <div className="book-title">{book.title}</div>
	                          <div className="book-authors">{book.authors}</div>
	                        </div>
	                      </li>
                      ))
                    ))}
                    </ol>
                  </div>
                </div>
                </React.Fragment>
			)
	}
}
export default BookList