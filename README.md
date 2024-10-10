# Blog

## Dependencies

To build this blog, you need to use [Pandoc](https://pandoc.org/), a file converter from one markup format to another. See how to install Pandoc on your operating system at [Installing Pandoc](https://pandoc.org/installing.html)

## Posts

Each post is written in Markdown format and converted to HTML. Additional information (metadata) about each post must be in the form of a YAML file.

Check out the post and author templates.

Post template:
- [template/posts/template.md](./template/posts/template.md)
- [template/posts/template.yaml](./template/posts/template.yaml)
- [template/posts/template.bib](./template/posts/template.bib)

Author template:
- [template/authors/template.md](./template/authors/template.md)
- [template/authors/template.yaml](./template/authors/template.yaml)

## Manage posts

Use the `setup.sh` bash script to manage posts.

### Help

```
./setup.sh --help
```

### Structure needed

Create the directory structure needed to start the blog.

```
./setup.sh --setup
```

This command will create the following directories.

Posts:
- `posts/markdown/`
- `posts/matadata/`
- `posts/bibliography/`
- `posts/html/`

Authors (no bibliography): 
- `authors/markdown/`
- `authors/matadata/`
- `authors/html/`


### Convert Markdown to HTML

The HTML files must have the same name as the metadata.

```
./setup.sh --post [Markdown file] --metadata [YAML file] --output [HTML file]
```
 
If you need to use bibliography, just create a file in BibTeX format (`.bib`).

```
./setup.sh --post [Markdown file] --metadata [YAML file] --bib [BibTeX] --output [HTML file]
```

To avoid having to generate each post at once, you can iterate through the directories created by `--setup` (`posts/` and `authors/`). As long as the files in the subdirectories (`markdown/`, `metadata/`, `bibliography/` and `html/`) have the same name.

```
./setup.sh --all posts/
```
or
```
./setup.sh --all authors/
```