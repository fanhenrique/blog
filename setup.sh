#!/bin/bash

POST_MD_DIR="./posts/markdown/"
POST_METADATA_DIR="./posts/metadata/"
POST_HTML_DIR="./posts/html/"
POST_BIB_DIR="./posts/bibliography/"

AUTHORS_MD_DIR="./authors/markdown/"
AUTHORS_METADATA_DIR="./authors/metadata/"
AUTHORS_HTML_DIR="./authors/html/"

function show_help() {
    echo ""
    echo "Usage: $0 [option] [file or dir]"
    echo ""
    echo "Options:"
    echo "  -p, --post [Markdown file]          Required"
    echo "  -m, --metadata [YAML file]          Required"
    echo "  -o, --output [HTML file]            Required"
    echo "  -b, --bib [BibTeX file]             Optional"
    echo "  -a, --all [posts/] or [authors/]    Converts all Markdown to HTML in the specified path."
    echo "                                      A metadata file (YAML) is required."
    echo "                                      A BibTeX file is optional for posts/."
    echo "                                      The files must have the same name, each in a respective subdirectory."
    echo "  -s, --setup                         Creates all necessary directories."
    echo "                                          [posts/] and [authors/]"
    echo "                                      And their subdirectories with the template files."
    echo "                                          [posts/markdown/], [posts/matadata/], [posts/bibliography/], [posts/html/]"
    echo "                                          [authors/markdown/], [authors/matadata/], [authors/html/]"
    echo "  -h, --help                          Show this help message."
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
        --filter pandoc-crossref \
        --figure-caption-position="above" \
        --table-caption-position="above" \
        --output "$3"
    then 
        echo "New HTML file created: $3"
    else
        pandocError $?
    fi
}

function pandocError(){
    echo ""
    echo "Pandoc error: $1"
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
        --filter pandoc-crossref \
        --figure-caption-position="above" \
        --table-caption-position="above" \
        --output "$4"
    then
        echo "New HTML file created: $4"
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

if [[ "$#" -eq 0 ]]; then
    echo "No arguments provided."
    show_help
    exit 1
fi

POST_FILE=""
BIB_FILE=""
METADATA_FILE=""
OUTPUT_FILE=""
ALL_PATH=""

while [[ "$#" -gt 0 ]]; do
    case "$1" in
        -s|--setup)
            authors_setup
            posts_setup
            shift
            ;;
        -p|--post)
            POST_FILE="$2"
            shift 2
            ;;
        -b|--bib)
            BIB_FILE="$2"
            shift 2
            ;;
        -m|--metadata)
            METADATA_FILE="$2"
            shift 2
            ;;
        -o|--output)
            OUTPUT_FILE="$2"
            shift 2
            ;;
        -a|--all)
            ALL_PATH="$2"
            shift 2
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

if [[ -n "$ALL_PATH" ]]; then
    case "$ALL_PATH" in
        posts/)
            posts
        ;;
        authors/)
            authors
        ;;
        *)
            echo ""
            echo "Error:"
            echo "  Invalid option: $ALL_PATH"
            echo ""
            echo "  If you don't already have the directory structure,"
            echo "    create it with the --setup argument."
            show_help
            exit 1
        ;;
    esac
else

    if [[ -n "$POST_FILE" && -n "$METADATA_FILE" && -n "$OUTPUT_FILE" ]]; then

        if [[ -n "$BIB_FILE" ]]; then
            generateHTMLWithBib "$POST_FILE" "$METADATA_FILE" "$BIB_FILE" "$OUTPUT_FILE"
        else
            generateHTML "$POST_FILE" "$METADATA_FILE" "$OUTPUT_FILE"
        fi
    else
        echo "Error:"
        echo "   The parameters --post, --metadata, --output are required."
        show_help
        exit 1
    fi
fi
