package main

import (
	"github.com/mitchellh/go-ps"
	"log"
	"net/http"
	"os"
)

func isChromiumRunning() bool {
	processes, err := ps.Processes()
	if err != nil {
		panic(err)
	}

	for _, process := range processes {
		if process.Executable() == "chromium" {
			return true
		}
	}

	return false
}

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		res := isChromiumRunning()

		if res {
			w.WriteHeader(http.StatusOK)
		} else {
			w.WriteHeader(http.StatusNotFound)
		}
	})

	port := os.Getenv("CHROMIUM_DETECTOR_PORT")
	if port == "" {
		port = "5000"
	}

	log.Fatal(http.ListenAndServe(":"+port, nil))
}
