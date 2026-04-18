import XCTest
import SwiftTreeSitter
import TreeSitterUn

final class TreeSitterUnTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_un())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Un grammar")
    }
}
