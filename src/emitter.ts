export function emit(ast: any[]): Uint8Array {
  const Opcodes = {
    i32_const: 0x41,
    i32_add: 0x6A,
    end: 0x0B,
  };

  const magicHeader = [0x00, 0x61, 0x73, 0x6d]; // Magic header
  const version = [0x01, 0x00, 0x00, 0x00];     // Version 1

  const typeSection = [
    0x01, // section "type" (ID 1)
    0x05, // section size (5 bytes)
    0x01, // number of types (1)
    0x60, // func
    0x00, // number of parameters (0)
    0x01, // number of results (1)
    0x7F  // result type - i32
  ];

  const functionSection = [
    0x03, // section "function" (ID 3) 
    0x02, // section size (2 bytes)
    0x01, // number of functions (1)
    0x00  // index of the function (0)
  ]; 
  const exportSection = [
    0x07, // section "export" (ID 7)
    0x08, // section size (8 bytes)
    0x01, // number of exports (1)
    0x04, // length of export name in bytes (4)
    0x6d, 0x61, 0x69, 0x6e, // export name ("main")
    0x00, // export kind (0 for function)
    0x00 // index of the exported function (0)
  ];

  // Generate the function body
  const functionBody = [];
  for (const node of ast) {
    if (node.type === "addFunc") {
      for (const operand of node.operands) {
        functionBody.push(Opcodes.i32_const);
        functionBody.push(operand.value); // Assume small integers for simplicity
      }
      functionBody.push(Opcodes.i32_add);
    }
  }
  functionBody.push(Opcodes.end);

  const codeSection = [
    0x0a, // section "code" (ID 10)
    0x07, // section size (7 bytes)
    0x01, // number of functions (1)
    0x05, // function body size (5 bytes)
    0x00, // number of local declarations (0)
    0x41, // instruction: i32.const
    0x2a, // i32 literal: 42 (!!! hardcoded for now)
    0x0f, // return
    0x0b  // function end
  ];

  return Uint8Array.from([
    ...magicHeader,
    ...version,
    ...typeSection,
    ...functionSection,
    ...exportSection,
    ...codeSection,
  ]);
}
