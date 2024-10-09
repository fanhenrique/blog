#!/bin/bash

POST_MD_DIR="./posts/markdown/"
POST_METADATA_DIR="./posts/metadata/"
POST_HTML_DIR="./posts/html/"
POST_BIB_DIR="./posts/bibliography/"

AUTHORS_MD_DIR="./authors/markdown/"
AUTHORS_METADATA_DIR="./authors/metadata/"
AUTHORS_HTML_DIR="./authors/html/"

function show_help() {
    echo "Usage: $0 [option]"
    echo ""
    echo "Options:"
    echo "  setup      Creates all necessary directories"
    echo "  post       Parameters: Markdown BibTeX YAML HTML"
    echo "  posts      Convert all Markdown file to HTML file"
    echo "  authors    Convert all Markdown file to HTML file"
    echo "  all        Options: posts & authors"
    echo "  -h, --help Show this help message"
    echo ""
}

function authors_setup(){

    if [ ! -d "$AUTHORS_MD_DIR" ]; then
        mkdir -p $AUTHORS_MD_DIR
        echo "Directory created $AUTHORS_MD_DIR"
        cp ./template.md $AUTHORS_MD_DIR
    fi

    if [ ! -d "$AUTHORS_METADATA_DIR" ]; then
        mkdir -p $AUTHORS_METADATA_DIR
        echo "Directory created $AUTHORS_METADATA_DIR"
        cp ./template.yaml $AUTHORS_METADATA_DIR
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

    if [ ! -d "$POST_METADATA_DIR" ]; then
        mkdir -p $POST_METADATA_DIR
        echo "Directory created $POST_METADATA_DIR"
        cp ./template.yaml $POST_METADATA_DIR
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

    if pandoc --from markdown --to html5 \
        "$1" \
        --verbose \
        --wrap=none \
        --no-highlight \
        --metadata-file "$2" \
        --output "$3" 
    then 
        echo "New file created: $3"
    else
        pandocError $?
    fi
}

function pandocError(){
    echo "pandoc error: $1"
    echo ""
    show_help
    exit 1
}

function generateHTMLWithBib() {

    if pandoc --from markdown --to html5 \
        "$1" \
        --verbose \
        --wrap=none \
        --no-highlight \
        --metadata-file "$2" \
        --bibliography "$3" \
        --citeproc \
        --output "$4"
    then
        echo "New file created: $4"
    else
        pandocError $?
    fi
}

function posts() {

    MD_FILES=$(ls $POST_MD_DIR)
    METADATA_FILES=$(ls $POST_METADATA_DIR)
    BIB_FILES=$(ls $POST_BIB_DIR)

    for MD_FILE in $MD_FILES; do
        MD_FILENAME=${MD_FILE%.*}

        for METADATA_FILE in $METADATA_FILES; do
            METADATA_FILENAME=${METADATA_FILE%.*}

            for BIB_FILE in $BIB_FILES; do
                BIB_FILENAME=${BIB_FILE%.*}

                if [[ "$METADATA_FILENAME" == "$MD_FILENAME" ]]; then
                    if [[ "$MD_FILENAME" == "$BIB_FILENAME" ]]; then
                        generateHTMLWithBib \
                            "${POST_MD_DIR}${MD_FILE}" \
                            "${POST_METADATA_DIR}${METADATA_FILE}" \
                            "${POST_BIB_DIR}${BIB_FILE}" \
                            "${POST_HTML_DIR}${MD_FILENAME}.html"
                    else    
                        generateHTML \
                            "${POST_MD_DIR}${MD_FILE}" \
                            "${POST_METADATA_DIR}${METADATA_FILE}" \
                            "${POST_HTML_DIR}${MD_FILENAME}.html"
                    fi
                fi
            done
        done
    done
}

function authors() {
  
    MD_FILES=$(ls $AUTHORS_MD_DIR)
    METADATA_FILES=$(ls $AUTHORS_METADATA_DIR)

    for MD_FILE in $MD_FILES; do
        MD_FILENAME=${MD_FILE%.*}

        for METADATA_FILE in $METADATA_FILES; do
            METADATA_FILENAME=${METADATA_FILE%.*}

            if [[ "$METADATA_FILENAME" == "$MD_FILENAME" ]]; then
                generateHTML \
                    "${AUTHORS_MD_DIR}${MD_FILE}" \
                    "${AUTHORS_METADATA_DIR}${METADATA_FILE}" \
                    "${AUTHORS_HTML_DIR}${MD_FILENAME}.html"
            fi
        done
    done
}

function post(){
    generateHTMLWithBib "${1}" "${2}" "${3}" "${4}"
}

while [[ "$#" -gt 0 ]]; do
    case "$1" in
        setup)
            authors_setup
            posts_setup
            shift
            ;;
        post)
            if [[ "$#" -lt 5 ]]; then
                echo "The 'post' option requires four parameters."
                show_help
                exit 1
            fi
            post "$2" "$3" "$4" "$5"
            shift 5
            ;;
        posts)
            posts
            shift
            ;;
        authors)
            authors
            shift
            ;;
        all)
            posts
            authors
            shift
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            echo "Invalid option: $1"
            show_help
            exit 1
            ;;
    esac
done
