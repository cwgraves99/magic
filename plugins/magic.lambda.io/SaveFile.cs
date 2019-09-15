﻿/*
 * Magic, Copyright(c) Thomas Hansen 2019 - thomas@gaiasoul.com
 * Licensed as Affero GPL unless an explicitly proprietary license has been obtained.
 */

using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using magic.node;
using magic.node.extensions;
using magic.signals.contracts;
using magic.lambda.io.utilities;

namespace magic.lambda.io
{
    [Slot(Name = "save-file")]
    public class SaveFile : ISlot
    {
        readonly ISignaler _signaler;

        public SaveFile(ISignaler signaler)
        {
            _signaler = signaler ?? throw new ArgumentNullException(nameof(signaler));
        }

        public void Signal(Node input)
        {
            if (input.Children.Count() != 1)
                throw new ApplicationException("[save-file] requires exactly one child node");

            _signaler.Signal("eval", input);

            var filename = RootResolver.Root + input.GetEx<string>(_signaler);
            File.WriteAllText(filename, input.Children.First().GetEx<string>(_signaler));
        }
    }
}
