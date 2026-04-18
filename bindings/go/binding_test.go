package tree_sitter_un_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_un "github.com/ptrrr1/un-programing-language/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_un.Language())
	if language == nil {
		t.Errorf("Error loading Un grammar")
	}
}
