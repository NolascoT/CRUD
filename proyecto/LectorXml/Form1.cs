using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Diagnostics;
using System.IO;
using System.Xml;

namespace LectorXml
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            OpenFileDialog buscar = new OpenFileDialog();
            string extension;

            if(buscar.ShowDialog() == DialogResult.OK)
            {
                extension = Path.GetExtension(buscar.FileName);
                if(extension==".xml")
                {
                    textBox1.Text = buscar.FileName;
                }
                else
                {
                    MessageBox.Show("Archivo Incorrecto");
                }
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            string umldiagrams = "umldiagrams";
            string UMLClassDiagram = "UMLClassDiagram";
            string UMLClass = "UMLClass";
            string superitem = "superitem";
            string UMLAssociation = "UMLAssociation";
            string point = "point";
            string UMLGeneralization = "UMLGeneralization";
            string valueAst = "value=\"*\"";
            string valueUno = "value=\"1\"";
            string valueNulo = "value=\"\"";
            char quitalo = '+';
            char quitalo2 = ':';

            string line;

            string NewXml = "";
            StreamReader seCargoXml = new StreamReader(textBox1.Text);
            
            while ((line = seCargoXml.ReadLine()) != null)
            {
                if (line.Contains(UMLClassDiagram) || line.Contains(UMLClass)
                    || line.Contains(superitem) || line.Contains(UMLAssociation)
                    || line.Contains(point) || line.Contains(UMLGeneralization)
                    || line.Contains(valueAst) || line.Contains(valueUno)
                    || line.Contains(valueNulo))
                {
                }
                else
                {
                    if (line.Contains(quitalo))
                    {
                        line = line.Replace("+", "");
                    }
                    if (line.Contains(quitalo2))
                    {
                        line = line.Replace(":", " ");
                    }
                    NewXml += line;
                    richTextBox1.Text = NewXml;
                }
            } 
            seCargoXml.Close();
            Console.WriteLine(NewXml);

            //XmlTextReader reader = new XmlTextReader(NewXml);

            /*while (reader.Read())
            {
                switch (reader.NodeType)
                {
                    case XmlNodeType.Element: // The node is an element.
                        //if (line.Contains(UMLClassDiagram)
                          //  {}
                        Console.Write("<" + reader.Name);
                        Console.WriteLine(">");
                            break;
                    case XmlNodeType.EndElement: //Display the end of the element.
                        Console.Write("</" + reader.Name);
                        Console.WriteLine(">");
                        break;
                }
            }
            Console.ReadLine();*/
        }

        private void button3_Click(object sender, EventArgs e)
        {

        }
    }
}
