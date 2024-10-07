#!/bin/bash

POST_MD_DIR="./posts/markdown/"
POST_YAML_DIR="./posts/metadata/"
POST_HTML_DIR="./posts/html/"
POST_BIB_DIR="./posts/bibliography/"

AUTHORS_MD_DIR="./authors/markdown/"
AUTHORS_YAML_DIR="./authors/metadata/"
AUTHORS_HTML_DIR="./authors/html/"

function show_help() {
    echo "Usage: $0 [option]"
    echo ""
    echo "Options:"
    echo "  setup      Creates all necessary directories"
    echo "  posts      Convert Markdown file to HTML file"
    echo "  authors    Convert Markdown file to HTML file"
    echo "  all        posts & authors"
    echo "  -h, --help Show this help message"
    echo ""
}

function authors_setup(){

    if [ ! -d "$AUTHORS_MD_DIR" ]; then
        mkdir -p $AUTHORS_MD_DIR
        echo "Directory created $AUTHORS_MD_DIR"
        cp ./template.md $AUTHORS_MD_DIR
    fi

    if [ ! -d "$AUTHORS_YAML_DIR" ]; then
        mkdir -p $AUTHORS_YAML_DIR
        echo "Directory created $AUTHORS_YAML_DIR"
        cp ./template.yaml $AUTHORS_YAML_DIR
    fi

    if [ ! -d "$AUTHORS_HTML_DIR" ]; then
        mkdir -p $AUTHORS_HTML_DIR
        echo "Directory created $AUTHORS_HTML_DIR"
    fi
}

function posts_setup(){

    if [ ! -d "$POST_MD_DIR" ]; then
        mkdir -p $POST_MD_DIR
        echo "Directory created $POST_MD_DIR"
        cp ./template.md $POST_MD_DIR
    fi

    if [ ! -d "$POST_YAML_DIR" ]; then
        mkdir -p $POST_YAML_DIR
        echo "Directory created $POST_YAML_DIR"
        cp ./template.yaml $POST_YAML_DIR
    fi

    if [ ! -d "$POST_HTML_DIR" ]; then
        mkdir -p $POST_HTML_DIR
        echo "Directory created $POST_HTML_DIR"
    fi

    if [ ! -d "$POST_BIB_DIR" ]; then
        mkdir -p $POST_BIB_DIR
        echo "Directory created $POST_BIB_DIR"
        cp ./template.bib $POST_BIB_DIR
    fi
}

function generateHTML() {

    pandoc --from markdown --to html5 \
        "$1" \
        --verbose \
        --wrap=none \
        --no-highlight \
        --metadata-file "$2" \
        --output "$3" 
    
    echo "New file created: $3"
}

function generateHTMLWithBib() {

    pandoc --from markdown --to html5 \
        "$1" \
        --verbose \
        --wrap=none \
        --no-highlight \
        --bibliography "$2" \
        --citeproc \
        --metadata-file "$3" \
        --output "$4"

    echo "New file created: $4"
}

function posts() {

    MD_FILES=$(ls $POST_MD_DIR)
    YAML_FILES=$(ls $POST_YAML_DIR)
    BIB_FILES=$(ls $POST_BIB_DIR)

    for MD_FILE in $MD_FILES; do
        # MD_EXTENSION="${MD_FILE#*.}"
        MD_FILENAME=${MD_FILE%.*}

        for YAML_FILE in $YAML_FILES; do
            # YAML_EXTENSION="${YAML_FILE#*.}"
            YAML_FILENAME=${YAML_FILE%.*}

            for BIB_FILE in $BIB_FILES; do
                # BIB_EXTENSION="${BIB_FILE#*.}"
                BIB_FILENAME=${BIB_FILE%.*}

                if [[ "$YAML_FILENAME" == "$MD_FILENAME" ]]; then
                    if [[ "$MD_FILENAME" == "$BIB_FILENAME" ]]; then
                        generateHTMLWithBib \
                            "${POST_MD_DIR}${MD_FILE}" \
                            "${POST_BIB_DIR}${BIB_FILE}" \
                            "${POST_YAML_DIR}${YAML_FILE}" \
                            "${POST_HTML_DIR}${MD_FILENAME}.html"
                    else    
                        generateHTML \
                            "${POST_MD_DIR}${MD_FILE}" \
                            "${POST_YAML_DIR}${YAML_FILE}" \
                            "${POST_HTML_DIR}${MD_FILENAME}.html"
                    fi
                fi
            done
        done
    done
}

function authors() {
  
    MD_FILES=$(ls $AUTHORS_MD_DIR)
    YAML_FILES=$(ls $AUTHORS_YAML_DIR)

    for MD_FILE in $MD_FILES; do
        MD_FILENAME=${MD_FILE%.*}

        for YAML_FILE in $YAML_FILES; do
            YAML_FILENAME=${YAML_FILE%.*}

            if [[ "$YAML_FILENAME" == "$MD_FILENAME" ]]; then
                generateHTML \
                    "${AUTHORS_MD_DIR}${MD_FILE}" \
                    "${AUTHORS_YAML_DIR}${YAML_FILE}" \
                    "${AUTHORS_HTML_DIR}${MD_FILENAME}.html"
            fi
        done
    done
}

case "$1" in
    setup)
        authors_setup
        posts_setup
        ;;
    posts)
        posts
        ;;
    authors)
        authors
        ;;
    all)
        posts
        authors
        ;;
    -h|--help)
        show_help
        ;;
    *)
        echo "Invalid option: $1"
        show_help
        exit 1
        ;;
esac