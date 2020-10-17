// Golang HTTP Server
package main

import (
	"fmt"
	"log"
	"net/http"
)

type Result struct {
	StatusCode int `json: "status"`
	Sudoku SudokuSlice `json: "sudoku_data"`
	SudokuString `json: "sudoku_string"`
}

func main() {

	http.HandleFunc("/", home)
	http.HandleFunc("/solve/:puzzle", func(w http.ResponseWriter, r *http.Request) {
		data, err := json.Marshal()
		if err != nil {
			// handle error
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(jData))
	})

	if err := http.ListenAndServe(":5050", nil); err != nil {
		log.Fatal("Error Starting the HTTP Server : ", err)
		return
	}

}